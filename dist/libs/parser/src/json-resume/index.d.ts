import type { Json } from "@reactive-resume/utils";
import type { Schema } from "zod";
import type { Parser } from "../interfaces/parser";
import type { JsonResume } from "./schema";
export * from "./schema";
export declare class JsonResumeParser implements Parser<Json, JsonResume> {
    schema: Schema;
    constructor();
    readFile(file: File): Promise<Json>;
    validate(data: Json): JsonResume;
    convert(data: JsonResume): any;
}
