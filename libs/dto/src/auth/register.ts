import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

export const registerSchema = userSchema
  .pick({ first_name: true, last_name: true, email: true, phone_number: true, locale: true })
  .extend({ 
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(255, "Password must be less than 255 characters"),
    confirm_password: z.string()
      .min(6, "Confirm password must be at least 6 characters long")
      .max(255, "Confirm password must be less than 255 characters")
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // This will show the error on the confirm_password field
  });

export class RegisterDto extends createZodDto(registerSchema) {}
