import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

export const registerSchema = userSchema
  .pick({ first_name: true, last_name: true, email: true, phone_number: true, locale: true })
  .extend({ password: z.string().min(6), confirm_password: z.string().min(6) });

export class RegisterDto extends createZodDto(registerSchema) {}
