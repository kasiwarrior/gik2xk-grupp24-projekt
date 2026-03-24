const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product Routes 
// GET /api/products - Hämtar alla products
router.get('/products', productController.getAllProducts);

// GET /api/products/:id - Hämtar en specefik produkt
router.get('/products/:id', productController.getProductById);

// POST /api/products - skapa en ny product
router.post('/products', productController.createProduct);

// PUT /api/products/:id - Uppdatera en specefik produkt
router.put('/products/:id', productController.updateProduct);

// DELETE /api/products/:id - Radera en specefik produkt
router.delete('/products/:id', productController.deleteProduct);

// POST /api/products/:id/ratings - Lägg till en rating
router.post('/products/:id/ratings', productController.addRating);

// Cart Routes 
// GET /api/carts/:id - hämta cart och alla products kopplade till den
router.get('/carts/:id', productController.getCartById);

// POST /api/carts/:cartId/products - Lägg till product i cart
router.post('/carts/:cartId/products', productController.addProductToCart);

// PUT /api/carts/:id/pay - Markera varukorg som betald
router.put('/carts/:id/pay', productController.payCart);

module.exports = router;