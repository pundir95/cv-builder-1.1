import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

export const authResponseSchema = z.object({
  status: z.enum(["authenticated", "2fa_required"]),
  data: z.object({
    access: z.string(),
    refresh: z.string(),
    user: userSchema,
  }),
});

export class AuthResponseDto extends createZodDto(authResponseSchema) {}
