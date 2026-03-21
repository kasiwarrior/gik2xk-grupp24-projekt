const db = require('../models');
const { createResponseSucces, createResponseError, createResponseMessage } = require('../helpers/responseHelper');

// Helper to remove password before sending to client
function _formatUser(user) {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageURL: user.imageURL,
        createdAt: user.createdAt
    };
}

async function getAllUsers() {
    try {
        const users = await db.user.findAll();
        return createResponseSucces(users.map(user => _formatUser(user)));
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function getUserById(id) {
    try {
        const user = await db.user.findOne({ 
            where: { id },
            include: [db.cart]
        });
        if (!user) return createResponseError(404, 'Användaren hittades inte.');
        
        return createResponseSucces(_formatUser(user));
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function createUser(userData) {
    try {
        const newUser = await db.user.create(userData);
        
        //skapar en cart automatiskt
        await db.cart.create({ userId: newUser.id, payed: false });

        return createResponseSucces(_formatUser(newUser));
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function updateUser(id, userData) {
    try {
        const user = await db.user.findOne({ where: { id } });
        if (!user) return createResponseError(404, 'Användaren hittades inte.');

        await db.user.update(userData, { where: { id } });
        return createResponseMessage(200, 'Användaren uppdaterades.');
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

async function deleteUser(id) {
    try {
        const deleted = await db.user.destroy({ where: { id } });
        if (deleted === 0) return createResponseError(404, 'Användaren hittades inte.');
        
        return createResponseMessage(200, 'Användaren raderades.');
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// Hämta senaste cart
async function getLatestCart(userId) {
    if (!userId) return createResponseError(422, 'Användar-ID är obligatoriskt.');

    try {
        const latestCart = await db.cart.findOne({
            where: { userId: userId },
            order: [['createdAt', 'DESC']], // sortera nyaste först
            include: [db.product]           // Includera producterna i cart
        });

        if (!latestCart) {
            return createResponseError(404, 'Ingen varukorg hittades för denna användare.');
        }

        return createResponseSucces(latestCart);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// ska ny tom cart
async function createNewCart(userId) {
    if (!userId) return createResponseError(422, 'Användar-ID är obligatoriskt.');

    try {
        const newCart = await db.cart.create({ 
            userId: userId, 
            payed: false 
        });

        return createResponseSucces(newCart);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// Don't forget to export them at the bottom!
module.exports = { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    getLatestCart, 
    createNewCart 
};