import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { usernameSchema } from "../user";

export const loginSchema = z
  .object({
    email: z.string().transform((value) => value.toLowerCase()),
    password: z.string(),
  })
  .refine(
    (value) => {
      return value.email.includes("@")
        ? z.string().email().parse(value.email)
        : usernameSchema.parse(value.email);
    },
    { message: "InvalidCredentials" },
  );

export class LoginDto extends createZodDto(loginSchema) {}
