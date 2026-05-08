export interface PaymentRequestDto {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  currency: string;
}