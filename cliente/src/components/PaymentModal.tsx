import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Alert, Box
} from '@mui/material';
import api from '../middleware/api';

interface Props {
    open: boolean;
    onClose: () => void;
    movieTitulo: string;
}

export default function PaymentModal({ open, onClose, movieTitulo }: Props) {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState({ cardHolder: '', cardNumber: '', expiryDate: '', cvv: '' });

    const validate = () => {
        const e = { cardHolder: '', cardNumber: '', expiryDate: '', cvv: '' };
        if (!cardHolder) e.cardHolder = 'El titular es obligatorio';
        if (!cardNumber || cardNumber.length !== 16) e.cardNumber = 'El número debe tener 16 dígitos';
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) e.expiryDate = 'Formato MM/YY';
        if (!cvv || cvv.length !== 3) e.cvv = 'El CVV debe tener 3 dígitos';
        setErrors(e);
        return !e.cardHolder && !e.cardNumber && !e.expiryDate && !e.cvv;
    };

    const handlePagar = async () => {
        if (!validate()) return
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            const res = await api.post('/payments/charge', {
                cardHolder,
                cardNumber,
                expiryDate,
                cvv,
                amount: 10,
                currency: 'EUR',
            });
            if (res.data.success) {
                setResult('Pago realizado correctamente');
            } else {
                setError('Pago rechazado. Inténtalo de nuevo.');
            }
        } catch {
            setError('Error al procesar el pago');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setCardHolder('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setResult(null);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Comprar entrada — {movieTitulo}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {result && <Alert severity="success">{result}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        label="Titular"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        error={!!errors.cardHolder}
                        helperText={errors.cardHolder}
                        fullWidth
                    />
                    <TextField
                        label="Número de tarjeta"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        fullWidth
                    />
                    <TextField
                        label="Fecha de expiración (MM/YY)"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate}
                        fullWidth
                    />
                    <TextField
                        label="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handlePagar} disabled={loading}>
                    {loading ? 'Procesando...' : 'Pagar 10€'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}