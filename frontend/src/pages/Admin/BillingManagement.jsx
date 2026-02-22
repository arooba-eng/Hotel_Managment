import { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, IconButton, Chip, Modal, Stack,
    CircularProgress, Alert, Grid, Card, CardContent, Divider
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getInvoices, updatePaymentStatus } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

const BillingManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await getInvoices();
            setInvoices(data);
        } catch (err) {
            setError('Failed to load billing data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = (invoice) => {
        setSelectedInvoice(invoice);
        setOpen(true);
    };

    const handlePayment = async (id, status) => {
        try {
            await updatePaymentStatus(id, { paymentStatus: status, paymentMethod: 'card' });
            setOpen(false);
            fetchData();
        } catch (err) {
            setError('Payment update failed');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={30} /></Box>;

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>Billing & Invoices</Typography>
                    <Typography variant="body2" color="text.secondary">Monitor payments and generate financial records.</Typography>
                </Box>
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'rgba(52, 78, 65, 0.04)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Invoice #</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Guest</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Total Amount</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice._id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{invoice.invoiceNumber}</TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{invoice.guest?.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{invoice.guest?.email}</Typography>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 800, color: 'primary.main' }}>
                                    ${invoice.totalAmount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={invoice.paymentStatus.toUpperCase()}
                                        size="small"
                                        color={invoice.paymentStatus === 'paid' ? 'success' : 'warning'}
                                        sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpen(invoice)}><VisibilityIcon sx={{ fontSize: 20 }} /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    {selectedInvoice && (
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Invoice Details</Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography variant="overline" color="text.secondary">Invoice Number</Typography>
                                    <Typography sx={{ fontWeight: 700, mb: 2 }}>{selectedInvoice.invoiceNumber}</Typography>

                                    <Typography variant="overline" color="text.secondary">Guest Name</Typography>
                                    <Typography sx={{ fontWeight: 700, mb: 2 }}>{selectedInvoice.guest?.name}</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Typography variant="overline" color="text.secondary">Date Issued</Typography>
                                    <Typography sx={{ fontWeight: 700, mb: 2 }}>{new Date(selectedInvoice.issuedAt).toLocaleDateString()}</Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Stack spacing={1.5}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Room Charges</Typography>
                                    <Typography sx={{ fontWeight: 600 }}>${selectedInvoice.roomCharges.toFixed(2)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Service Charges</Typography>
                                    <Typography sx={{ fontWeight: 600 }}>${selectedInvoice.serviceCharges.toFixed(2)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Taxes (10%)</Typography>
                                    <Typography sx={{ fontWeight: 600 }}>${selectedInvoice.taxAmount.toFixed(2)}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Total Amount</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>${selectedInvoice.totalAmount.toFixed(2)}</Typography>
                                </Stack>
                            </Stack>

                            {selectedInvoice.paymentStatus !== 'paid' && (
                                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<PaidIcon />}
                                        onClick={() => handlePayment(selectedInvoice._id, 'paid')}
                                        sx={{ borderRadius: 2, height: 48 }}
                                    >
                                        Mark as Paid
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => setOpen(false)}
                                        sx={{ borderRadius: 2, height: 48 }}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default BillingManagement;
