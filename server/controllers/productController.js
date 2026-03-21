const shopService = require('../services/productService');

async function getAllProducts(req, res) {
    const response = await shopService.getAllProducts();
    res.status(response.status || 200).json(response);
}

async function getProductById(req, res) {
    const productId = req.params.id;
    const response = await shopService.getProductById(productId);
    res.status(response.status || 200).json(response);
}

async function getCartById(req, res) {
    const cartId = req.params.id;
    const response = await shopService.getCartById(cartId);
    res.status(response.status || 200).json(response);
}

async function createProduct(req, res) {
    const productData = req.body;
    const response = await shopService.createProduct(productData);
    res.status(response.status || 201).json(response);
}

async function updateProduct(req, res) {
    const productId = req.params.id;
    const productData = req.body;
    
    const response = await shopService.updateProduct(productId, productData);
    res.status(response.status || 200).json(response);
}

async function deleteProduct(req, res) {
    const productId = req.params.id;
    
    const response = await shopService.deleteProduct(productId);
    res.status(response.status || 200).json(response);
}

async function addRating(req, res) {
    const productId = req.params.id;
    const userId = req.body.userId;
    const ratingData = req.body;
    
    const response = await shopService.addRating(productId, userId, ratingData);
    res.status(response.status || 201).json(response);
}

async function addProductToCart(req, res) {
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const amount = req.body.amount ? parseInt(req.body.amount) : 1;
    
    const response = await shopService.addProductToCart(cartId, productId, amount);
    res.status(response.status || 200).json(response);
}

module.exports = {
    getAllProducts,
    getProductById,
    getCartById,
    createProduct,
    addRating,
    addProductToCart
};