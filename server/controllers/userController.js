const userService = require('../services/userService');

async function getAllUsers(req, res) {
    const response = await userService.getAllUsers();
    res.status(response.status || 200).json(response);
}

async function getUserById(req, res) {
    const response = await userService.getUserById(req.params.id);
    res.status(response.status || 200).json(response);
}

async function createUser(req, res) {
    const response = await userService.createUser(req.body);
    res.status(response.status || 201).json(response);
}

async function updateUser(req, res) {
    const response = await userService.updateUser(req.params.id, req.body);
    res.status(response.status || 200).json(response);
}

async function deleteUser(req, res) {
    const response = await userService.deleteUser(req.params.id);
    res.status(response.status || 200).json(response);
}

async function getLatestCart(req, res) {
    const userId = req.params.id; 
    const response = await userService.getLatestCart(userId);
    res.status(response.status || 200).json(response);
}

async function createNewCart(req, res) {
    const userId = req.params.id;
    const response = await userService.createNewCart(userId);
    res.status(response.status || 201).json(response);
}

module.exports = { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    getLatestCart,
    createNewCart 
};