import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('3001'),
  RABBIT_URL: z.string().url(),
  PG_HOST: z.string(),
  PG_PORT: z.string().default('5432'),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function loadEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables for order-service');
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
