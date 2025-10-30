import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_EVALR_API_URL: z.url(),
});

let parsedEnv: z.infer<typeof EnvSchema> | null = null;

export const env = new Proxy({} as z.infer<typeof EnvSchema>, {
  get(_target, prop) {
    if (!parsedEnv) {
      parsedEnv = EnvSchema.parse({
        NEXT_PUBLIC_EVALR_API_URL: process.env.NEXT_PUBLIC_EVALR_API_URL,
      });
    }
    return parsedEnv[prop as keyof typeof parsedEnv];
  },
});
