const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Hämta alla användare
router.get('/users', userController.getAllUsers);

// GET /api/users/:id - Hämta en specefik användare
router.get('/users/:id', userController.getUserById);

// POST /api/users - Skapa en ny användare
router.post('/users', userController.createUser);

// PUT /api/users/:id - Uppdatera en användare
router.put('/users/:id', userController.updateUser);

// DELETE /api/users/:id - Radera en användare
router.delete('/users/:id', userController.deleteUser);

// GET /api/users/:id/carts/latest - Hämta användarens senaste varukorg
router.get('/users/:id/carts/latest', userController.getLatestCart);

// POST /api/users/:id/carts - Skapa en ny (tom) varukorg för användaren
router.post('/users/:id/carts', userController.createNewCart);

module.exports = router;