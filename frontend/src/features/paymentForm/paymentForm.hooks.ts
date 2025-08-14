import { useState } from 'react';
import { createPaymentSession, checkPaymentStatus } from './paymentForm.api.ts';
import type { IFormData } from './paymentForm.types.ts';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const processPayment = async (data: IFormData) => {
    setLoading(true);
    setResult(null);

    try {
      const { pid } = await createPaymentSession(data);

      const maxAttempts = 10;
      let attempt = 0;
      let finalStatus: 'ok' | 'fail' | 'process' = 'process';

      while (attempt < maxAttempts) {
        await delay(1000);
        try {
          const { status } = await checkPaymentStatus(pid);
          if (status === 'ok' || status === 'fail') {
            finalStatus = status;
            break;
          }
        } catch {
          // Игнорируем разовые сетевые ошибки и продолжаем опрос
        }
        attempt += 1;
      }

      setResult(finalStatus === 'ok' ? 'success' : finalStatus === 'fail' ? 'error' : 'error');
    } catch {
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  const resetResult = () => setResult(null);

  return {
    loading,
    result,
    processPayment,
    resetResult,
  };
};
