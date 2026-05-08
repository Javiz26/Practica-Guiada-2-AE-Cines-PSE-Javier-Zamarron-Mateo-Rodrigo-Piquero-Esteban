import axios from 'axios';
import  type {PaymentRequestDto} from '../dtos/PaymentRequestdto'; 

const RETRYABLE_STATUSES = [500, 502, 503, 504];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const client = axios.create({
  baseURL: process.env.WEBSERVICES_BASE_URL || 'https://webservices.samuelencinas.dev',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

async function login(): Promise<string> {
  const { data } = await client.post('/auth/login', {
    username: process.env.WEBSERVICES_USERNAME,
    password: process.env.WEBSERVICES_PASSWORD,
  });
  return data.access_token;
}



export async function chargePayment(payload: PaymentRequestDto) {
  const token = await login();
  const { data } = await client.post('/payments/charge', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!status || !RETRYABLE_STATUSES.includes(status)) throw error;
        if (attempt < maxAttempts) {
          const delay = 200 * 2 ** (attempt - 1);
          await sleep(delay);
        }
      } else {
        throw error;
      }
    }
  }
  throw lastError;
}