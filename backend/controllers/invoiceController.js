const Invoice = require('../models/Invoice');
const Booking = require('../models/Booking');
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private/Admin
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({})
            .populate('guest', 'name email address phone')
            .populate('booking');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate an invoice for a booking
// @route   POST /api/invoices
// @access  Private/Admin
const generateInvoice = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId).populate('room');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if invoice already exists
        const existingInvoice = await Invoice.findOne({ booking: bookingId });
        if (existingInvoice) {
            return res.status(400).json({ message: 'Invoice already exists for this booking' });
        }

        // Calculate room charges
        const days = Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24)) || 1;
        const roomCharges = days * booking.room.pricePerNight;

        // Calculate service charges
        const services = await ServiceRequest.find({ booking: bookingId, status: { $ne: 'cancelled' } });
        const serviceCharges = services.reduce((total, s) => total + (s.cost || 0), 0);

        const taxAmount = (roomCharges + serviceCharges) * 0.1; // 10% Tax
        const totalAmount = roomCharges + serviceCharges + taxAmount;

        const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const invoice = await Invoice.create({
            booking: bookingId,
            guest: booking.guest,
            invoiceNumber,
            roomCharges,
            serviceCharges,
            taxAmount,
            totalAmount,
            paymentStatus: 'unpaid',
        });

        res.status(201).json({
            message: 'Invoice generated successfully',
            invoice
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update invoice payment status
// @route   PUT /api/invoices/:id/payment
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus, paymentMethod } = req.body;
        const invoice = await Invoice.findById(req.params.id);

        if (invoice) {
            invoice.paymentStatus = paymentStatus || invoice.paymentStatus;
            invoice.paymentMethod = paymentMethod || invoice.paymentMethod;

            if (paymentStatus === 'paid') {
                // Optionally update booking or handle other logic
            }

            const updatedInvoice = await invoice.save();
            res.json({
                message: 'Payment status updated',
                invoice: updatedInvoice
            });
        } else {
            res.status(404).json({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInvoices,
    generateInvoice,
    updatePaymentStatus,
};
