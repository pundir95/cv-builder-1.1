import { createZodDto } from "nestjs-zod/dto";

import { userSchema } from "./user";

export const updateUserSchema = userSchema.partial().pick({
  locale: true,
  first_name: true,
  last_name: true,
  email: true,
  picture: true,
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
