import z from 'zod'
export const homeworkSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required.")
    .max(255, "Title must not exceed 255 characters."),
  start_date: z
    .string()
    .nonempty("Start date is required.")
    .refine((date) => !isNaN(Date.parse(date)), "Start date must be a valid date."),
  end_date: z
    .string()
    .nonempty("End date is required.")
    .refine((date) => !isNaN(Date.parse(date)), "End date must be a valid date."),
  description: z.string().optional(), 
});