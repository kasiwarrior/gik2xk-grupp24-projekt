const db = require('../models');
const validate = require('validate.js');
const constraints = {
    title:{
        length: {
        minimum: 2,
        maximum: 100,
        tooshort: "^Titeln måste vara minst %{count} tecken lång. ",
        toolong: "^Titeln får inte vara längre än %{count} tecken lång."

        }
       
    }
};

const {
    createResponseSucces,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

async function getById(id) {
        try {
        const product = await db.product.findOne({
        where: { id },
        include: [
            db.user,
            db.tag,
            {
                model: db.comment,
                include: [db.user]
            }
        ]
    });
        return createResponseSucces(_formatPost(product));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getByCart(cartId) {
        try {
        const cart = await db.cart.findOne({where: {id: cartID}});    
        const allProducts = await cart.getPosts({include: [db.product, db.cart]});
        return createResponseSucces(allProducts.map(product => _formatPost(product)));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getAll() {
    try {
        const allPosts = await db.post.findAll({include: [db.user, db.tag]});
        return createResponseSucces(allPosts.map(post => _formatPost(post)));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(post) {
    const invalidData = validate(post, constraints);
    if (invalidData) {
        return createResponseError(422, invalidData);
    } else {
        try {
           const newPost = await db.post.create(post);

           await _addTagToPost(newPost, post.tags);
           return createResponseSucces(newPost);
        } catch (error) {
            return createResponseError(error.status, error.message);
        }
    }
}
     
async function addComment(id, comment) {
    const invalidData = validate(comment, constraints);
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt.');
    }  
    try {
    comment.postId = id;
    const newComment = await db.comment.create(comment);
    return createResponseSucces(newComment);
    } catch (error) {
    return createResponseError(error.status, error.message);
    }
    
}

async function update(post, id) {
    const invalidData = validate(post, constraints );
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
        }
    if (invalidData) {
        return createResponseError(422, invalidData);
        } 
    try {
        const existingPost = await db.post.findOne({where: {id}});  
         if (!existingPost) {
        return createResponseError(404, 'Inlägget hittades inte!.');
        }
        await _addTagToPost(existingPost, post.tags);
        await db.post.update(post, {
            where: {id}
        });
        return createResponseMessage(200, 'Inlägget uppdaterades')
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
      
}

async function destroy(id) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    try {
        await db.post.destroy({
        where: { id }
    })
    return createResponseMessage(200, 'Inlägget raderades')
    } catch (error) {
    return createResponseError(error.status, error.message);
    }
  
}

function _formatPost(post) {
    const cleanPost = {
        id: post.id,
        title: post.title,
        body: post.body,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
            id: post.user.id,
            username: post.user.username,
            email: post.user.email,
            firstName: post.user.firstName,
            lastName: post.user.lastName,
            imageUrl: post.user.imageUrl
        },
        tags: []
    };

    if (post.comments) {
        cleanPost.comments = [];
        post.comments.map((comment) => { 
          return (cleanPost.comments = [ 
            {
                title: comment.title,
                author: comment.user.username,
                createdAt: comment.createdAt
            },
            ...cleanPost.comments,
          ]);
        });
    }

    if (post.tags){
    post.tags.map((tag) => {
        return (cleanPost.tags = [tag.name, ...cleanPost.tags]);
    });
    return cleanPost;
    }
}

async function _findOrCreateTagId(name) {
    name = name.toLowerCase().trim();
    const foundOrCreatedTag = await db.tag.findOrCreate({where: { name }});

    return foundOrCreatedTag[0].id; 
}

async function _addTagToPost(post,tags) {
    if (tags  && tags.length) {
        for (const tag of tags) {
            const tagId = await _findOrCreateTagId(tag);
            await post.addTag(tagId);
        }
    }
}

module.exports = {
    getByAuthor,
    getByTag,
    getById,
    getAll,
    addComment,
    create,
    update,
    destroy
};