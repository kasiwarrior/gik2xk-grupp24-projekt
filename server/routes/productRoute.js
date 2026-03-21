const express = require('express');
const router = express.Router();
const shopController = require('../controllers/productController');

// Product Routes 
// GET /api/products - Hämtar alla products
router.get('/products', shopController.getAllProducts);

// GET /api/products/:id - Hämtar en specefik produkt
router.get('/products/:id', shopController.getProductById);

// POST /api/products - skapa en ny product
router.post('/products', shopController.createProduct);

// PUT /api/products/:id - Uppdatera en specefik produkt
router.put('/products/:id', shopController.updateProduct);

// DELETE /api/products/:id - Radera en specefik produkt
router.delete('/products/:id', shopController.deleteProduct);

// POST /api/products/:id/ratings - Lägg till en rating
router.post('/products/:id/ratings', shopController.addRating);

// Cart Routes 
// GET /api/carts/:id - hämta cart och alla products 
router.get('/carts/:id', shopController.getCartById);

// POST /api/carts/:cartId/products - Lägg till product i cart
router.post('/carts/:cartId/products', shopController.addProductToCart);

module.exports = router;