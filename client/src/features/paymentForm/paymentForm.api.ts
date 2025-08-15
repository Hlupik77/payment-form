import type { IFormData } from './paymentForm.types.ts';
import { config } from '../../common/config';

type JsonRpcResponse<T> = {
  jsonrpc: '2.0';
  id: string;
  result?: T;
  error?: unknown;
};

export const createPaymentSession = async (
  data: IFormData
): Promise<{ pid: string }> => {
  const pan = data.cardNumber.replace(/\D/g, '');
  const payload = {
    jsonrpc: '2.0',
    id: Math.random().toString(36).slice(2, 10),
    method: 'pay',
    params: {
      pan,
      expire: data.expiry,
      cardholder: data.cardholder,
      cvc: data.cvc,
    },
  };

  const res = await fetch(`${config.apiBaseUrl}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Network error');
  const json = (await res.json()) as JsonRpcResponse<{ pid: string }>;
  if (!json.result?.pid) throw new Error('Invalid response');
  return { pid: json.result.pid };
};

export const checkPaymentStatus = async (
  pid: string
): Promise<{ status: 'process' | 'ok' | 'fail'; pid: string }> => {
  const res = await fetch(`${config.apiBaseUrl}/pay/check/${pid}`, { method: 'GET' });
  if (!res.ok) throw new Error('Network error');
  const json = (await res.json()) as { status?: string; pid?: string };
  if (!json.status || !json.pid) throw new Error('Invalid response');
  const status = json.status as 'process' | 'ok' | 'fail';
  return { status, pid: json.pid };
};
