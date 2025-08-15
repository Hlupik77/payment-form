import { z } from 'zod';

const raw = import.meta.env?.VITE_API_BASE_URL as string | undefined;

const urlSchema = z.string().url();
const parsed = urlSchema.safeParse(raw);

const apiBaseUrlRaw = parsed.success ? parsed.data : 'http://localhost:2050';

const apiBaseUrl = apiBaseUrlRaw.replace(/\/$/, '');

export const config = {
  apiBaseUrl,
} as const;

