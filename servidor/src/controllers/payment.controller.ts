import { Request, Response } from 'express';
import { chargePayment, withRetry } from '../services/payment.service';
import type { PaymentRequestDto } from '../dtos/PaymentRequestdto';
import { logger } from '../libs/logger';

export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: PaymentRequestDto = req.body;

    const { cardHolder, cardNumber, expiryDate, cvv, amount, currency } = payload;
    if (!cardHolder || !cardNumber || !expiryDate || !cvv || !amount || !currency) {
      res.status(400).json({ success: false, message: 'Faltan datos de pago' });
      return;
    }

    const result = await withRetry(() => chargePayment(payload));

    if (result.status === 'declined') {
      logger.warn({ ...result, cardNumber: payload.cardNumber }, 'Pago rechazado');
      res.status(200).json({ success: false, message: 'Pago rechazado', data: result });
      return;
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(502).json({
      success: false,
      message: 'Error al procesar el pago',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};