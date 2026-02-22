const express = require('express');
const router = express.Router();
const {
    getInvoices,
    generateInvoice,
    updatePaymentStatus,
} = require('../controllers/invoiceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getInvoices)
    .post(protect, generateInvoice);

router.route('/:id/payment')
    .put(protect, updatePaymentStatus);

module.exports = router;
