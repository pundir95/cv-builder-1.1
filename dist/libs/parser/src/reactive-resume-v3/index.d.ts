import type { Json } from "@reactive-resume/utils";
import type { Schema } from "zod";
import type { Parser } from "../interfaces/parser";
import type { ReactiveResumeV3 } from "./schema";
export * from "./schema";
export declare class ReactiveResumeV3Parser implements Parser<Json, ReactiveResumeV3> {
    schema: Schema;
    constructor();
    readFile(file: File): Promise<Json>;
    validate(data: Json): ReactiveResumeV3;
    convert(data: ReactiveResumeV3): any;
}
