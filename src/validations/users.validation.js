import z from 'zod'

export const userSchema = z.object({
    name: z.string().nonempty('Name must not be empty'),
    email: z.string().email('Invalid email address').nonempty('Email must not be empty'),
    password: z.string().min(3, 'Password must be greater than 3 characters'),
    data_created: z.date().default(new Date).optional(),
    last_login: z.date().default(new Date).optional(),
    role: z.enum(['user', 'admin', 'teacher', 'student']).default('user').optional(),
});
