import z from 'zod'

export const coursesSchema = z.object({
    name: z.string().nonempty('Name must not be empty'),
    description: z.string().nonempty('description must not be empty')
});
