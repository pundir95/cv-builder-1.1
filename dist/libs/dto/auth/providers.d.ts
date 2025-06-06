import { z } from 'zod';
declare const AuthProvidersDto_base: import('nestjs-zod/dto').ZodDto<("email" | "github" | "google" | "openid")[], z.ZodArrayDef<z.ZodEnum<["email", "github", "google", "openid"]>>, ("email" | "github" | "google" | "openid")[]>;
export declare class AuthProvidersDto extends AuthProvidersDto_base {
}
export {};
