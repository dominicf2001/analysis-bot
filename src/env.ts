import { z } from 'zod';

const toggle = z
  .enum(['true', 'false', '0', '1'])
  .transform((v) => v === 'true' || v === '1');

const envVariables = z.object({
  DB_URL: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  BOT_INVITE_LINK: z.string().min(1)
});

export const env = envVariables.parse(process.env);
