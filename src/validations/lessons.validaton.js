import z from 'zod'
export const lessonSchema = z.object({
    assignment_id: z.number().int().positive("Assignment ID must be a positive integer."),
    homework_id: z.number().int().positive("Homework ID must be a positive integer."),
    video_path: z
      .string()
      .nonempty("Video path is required.")
      .url("Video path must be a valid URL."),
    start_date: z
      .number()
      .positive("Start date must be a positive integer.")
      .lte(Date.now(), "Start date cannot be in the future."),
    end_date: z
      .number()
      .positive("End date must be a positive integer."),
    title: z
      .string()
      .nonempty("Title is required.")
      .max(255, "Title must not exceed 255 characters."),
  });