const db = require('../models');
const validate = require('validate.js');

const constraints = {
    name: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: "^Namnet måste vara minst %{count} tecken långt.",
            tooLong: "^Namnet får inte vara längre än %{count} tecken långt."
        }
    },
    price: {
        numericality: {
            greaterThan: 0,
            notGreaterThan: "^Priset måste vara större än 0."
        }
    }
};

const {
    createResponseSucces,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');

// Hämtar produkten via ID, includerar rating
async function getProductById(id) {
    try {
        const product = await db.product.findOne({
            where: { id },
            include: [
                {
                    model: db.rating,
                    include: [db.user] // Hämtar user som skrev rating
                }
            ]
        });
        
        if (!product) {
            return createResponseError(404, 'Produkten hittades inte.');
        }
        return createResponseSucces(_formatProduct(product));
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// Hämtar cart och alla products som är kopplade till den
async function getCartById(cartId) {
    try {
        const cart = await db.cart.findOne({
            where: { id: cartId },
            include: [db.product] // hämtar via cart_row
        });
        
        if (!cart) {
            return createResponseError(404, 'Varukorgen hittades inte.');
        }
        return createResponseSucces(cart);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function getAllProducts() {
    try {
        const allProducts = await db.product.findAll();
        return createResponseSucces(allProducts);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function createProduct(productData) {
    const invalidData = validate(productData, constraints);
    if (invalidData) {
        return createResponseError(422, invalidData);
    } 
    
    try {
        const newProduct = await db.product.create(productData);
        return createResponseSucces(newProduct);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}
     
// Lägg till en rating
async function addRating(productId, userId, ratingData) {
    if (!productId || !userId) {
        return createResponseError(422, 'Product-ID och User-ID är obligatoriska.');
    }  
    try {
        // både productId och userId
        ratingData.productId = productId;
        ratingData.userId = userId; 
        
        const newRating = await db.rating.create(ratingData);
        return createResponseSucces(newRating);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// Uppdatera
async function updateProduct(id, productData) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }

    const invalidData = validate(productData, constraints);
    if (invalidData) {
        return createResponseError(422, invalidData);
    } 

    try {
        const existingProduct = await db.product.findOne({ where: { id } });  
        if (!existingProduct) {
            return createResponseError(404, 'Produkten hittades inte.');
        }

        await db.product.update(productData, {
            where: { id }
        });

        return createResponseMessage(200, 'Produkten uppdaterades framgångsrikt.');
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// Delete
async function deleteProduct(id) {
    if (!id) {
        return createResponseError(422, 'Id är obligatoriskt');
    }

    try {
        const deletedCount = await db.product.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            return createResponseError(404, 'Produkten hittades inte.');
        }

        return createResponseMessage(200, 'Produkten raderades framgångsrikt.');
    } catch (error) {
        return createResponseError(500, error.message);
    }
}  

// lägg till product i cart
async function addProductToCart(cartId, productId, amountToAdd = 1) {
    try {
        const cart = await db.cart.findOne({ where: { id: cartId } });
        if (!cart) return createResponseError(404, 'Varukorgen hittades inte.');
        
        // kollar om producten redan finns i cart
        const existingProducts = await cart.getProducts({ where: { id: productId } });
        
        if (existingProducts.length > 0) {
            // om den gör det så lägger den till mängden man vill lägga till på det som redan finns
            const existingProduct = existingProducts[0];
            const currentAmount = existingProduct.cartRow.amount;
            const newAmount = currentAmount + amountToAdd;
            
            await cart.addProduct(productId, { through: { amount: newAmount } });
            
            return createResponseMessage(200, `Antalet uppdaterades till ${newAmount}`);
        } else {
            // finns inte så lägger man bara till den
            await cart.addProduct(productId, { through: { amount: amountToAdd } });
            
            return createResponseMessage(200, 'Produkten lades till i varukorgen');
        }
    } catch (error) {
        return createResponseError(500, error.message);
    }
}


// Helper: formatering
function _formatProduct(product) {
    const cleanProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        ratings: []
    };

    if (product.ratings && product.ratings.length > 0) {
        cleanProduct.ratings = product.ratings.map((rating) => ({
            score: rating.score,
            author: rating.user ? `${rating.user.firstName} ${rating.user.lastName}` : 'Okänd användare',
            createdAt: rating.createdAt
        }));
    }

    return cleanProduct;
}

module.exports = {
    getProductById,
    getCartById,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    addRating,
    addProductToCart
};