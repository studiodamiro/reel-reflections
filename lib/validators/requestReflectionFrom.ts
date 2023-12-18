import { z } from 'zod';

export const RequestReflectionValidator = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, { message: 'Name is required' }),
  movie: z.string().min(1, { message: 'Movie is required' }),
  details: z.string().min(4, { message: 'Details are required' }),
});

export type TRequestReflectionValidator = z.infer<typeof RequestReflectionValidator>;
