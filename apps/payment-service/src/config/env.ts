import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  RABBIT_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function loadEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables for payment-service');
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}