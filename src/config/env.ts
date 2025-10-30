import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_EVALR_API_URL: z.url(),
});

export const env = EnvSchema.parse(process.env);
