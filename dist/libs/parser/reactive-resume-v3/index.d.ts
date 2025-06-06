import { Json } from '../../../utils/src/index.ts';
import { Schema } from 'zod';
import { Parser } from '../interfaces/parser';
import { ReactiveResumeV3 } from './schema';
export * from './schema';
export declare class ReactiveResumeV3Parser implements Parser<Json, ReactiveResumeV3> {
    schema: Schema;
    constructor();
    readFile(file: File): Promise<Json>;
    validate(data: Json): ReactiveResumeV3;
    convert(data: ReactiveResumeV3): any;
}
