
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    getAllOrders
} = require('../controllers/orderController');

const router = express.Router();

// Protected routes
router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders);
router.get('/all', authenticateToken, getAllOrders); // Admin route
router.get('/:id', authenticateToken, getOrderById);
router.put('/:id/status', authenticateToken, updateOrderStatus); // Admin route
router.put('/:id/cancel', authenticateToken, cancelOrder);

module.exports = router;
