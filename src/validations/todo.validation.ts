import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, { message: 'title is required' }),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});
