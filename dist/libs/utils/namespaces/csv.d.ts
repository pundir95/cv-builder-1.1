import { default as Papa } from 'papaparse';
import { Json } from './types';
export declare const parseCSV: (string: string) => Promise<Json[]>;
/**
 * Parser for cases when we receive an array like structure f.e. in the LinkedIn Profile.csv import
 * @param csvEntry array-like entry such as [TAG:https://some.link,TAG:https://someother.link]
 * @returns
 */
export declare const parseArrayLikeCSVEntry: (csvEntry: string) => string[];
export declare const csv: {
    parse: <T = any>(csv: string, options?: Papa.ParseConfig<T>) => Papa.ParseResult<T>;
    unparse: <T = any>(data: T[], options?: Papa.UnparseConfig) => string;
    parseFile: <T = any>(file: File, options?: Papa.ParseConfig<T>) => Promise<Papa.ParseResult<T>>;
};
