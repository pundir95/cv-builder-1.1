import { z } from "zod";
export declare const messageSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
declare const MessageDto_base: import("nestjs-zod/dto").ZodDto<{
    message: string;
}, z.ZodObjectDef<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    message: string;
}>;
export declare class MessageDto extends MessageDto_base {
}
export {};
