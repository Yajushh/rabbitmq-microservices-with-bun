export interface PaymentSucceededEvent {
  type: 'payment.succeeded';
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  paidAt: string;
}
