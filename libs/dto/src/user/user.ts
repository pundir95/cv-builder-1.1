import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { secretsSchema } from "../secrets";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(255, "Username must be less than 255 characters")
  .regex(/^[\w.-]+$/, {
    message: "Usernames can only contain letters, numbers, periods, hyphens, and underscores.",
  })
  .transform((value) => value.toLowerCase());

export const userSchema = z.object({
  id: idSchema,
  first_name: z.string()
    .min(1, "First name is required")
    .max(255, "First name must be less than 255 characters"),
  last_name: z.string()
    .min(1, "Last name is required")
    .max(255, "Last name must be less than 255 characters"),  
  picture: z.literal("").or(z.null()).or(z.string().url()),
  phone_number: z.string()
    .min(1, "Phone number is required")
    .max(255, "Phone number must be less than 255 characters"),
  username: usernameSchema,
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((value) => value.toLowerCase()),
  locale: z.string().default("en-US"),
  emailVerified: z.boolean().default(false),
  twoFactorEnabled: z.boolean().default(false),
  provider: z.enum(["email", "github", "google", "openid"]).default("email"),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  created_at: dateSchema,
  updated_at: dateSchema,
});

export class UserDto extends createZodDto(userSchema) {}

export const userWithSecretsSchema = userSchema.merge(
  z.object({ secrets: secretsSchema.nullable().default(null) }),
);

export class UserWithSecrets extends createZodDto(userWithSecretsSchema) {}
