import type { IFormData } from './paymentForm.types.ts';

export const mockPaymentRequest = (_data: IFormData) => {
  void _data;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ status: 'success' });
      } else {
        reject(new Error('Payment failed'));
      }
    }, 1500);
  });
};
