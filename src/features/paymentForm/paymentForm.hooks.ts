import { useState } from 'react';

import { mockPaymentRequest } from './paymentForm.api.ts';
import type { IFormData } from './paymentForm.types.ts';

export const useForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const processPayment = async (data: IFormData) => {
    setLoading(true);
    setResult(null);

    try {
      await mockPaymentRequest(data);
      setResult('success');
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
