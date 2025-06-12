
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', authenticateToken, addReview);

// Admin routes (add admin middleware later)
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
