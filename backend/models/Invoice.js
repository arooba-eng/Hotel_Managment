const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Booking',
        },
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        roomCharges: {
            type: Number,
            required: true,
            default: 0,
        },
        serviceCharges: {
            type: Number,
            required: true,
            default: 0,
        },
        taxAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['unpaid', 'paid', 'partially-paid', 'refunded'],
            default: 'unpaid',
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'card', 'bank-transfer', 'other'],
        },
        issuedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
