import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(6),
  confirm_password: z.string().min(6),
  email: z.string(),
});

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
