import Papa from 'papaparse';

import type { Json } from "./types";

export const parseCSV = async (string: string) => {
  return new Promise<Json[]>((resolve, reject) => {
    Papa.parse(string, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as Json[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

/**
 * Parser for cases when we receive an array like structure f.e. in the LinkedIn Profile.csv import
 * @param csvEntry array-like entry such as [TAG:https://some.link,TAG:https://someother.link]
 * @returns
 */
export const parseArrayLikeCSVEntry = (csvEntry: string) =>
  csvEntry.replace(/^\[/, "").replace(/$]/, "").split(",");

export const csv = {
  parse: <T = any>(csv: string, options?: Papa.ParseConfig<T>): Papa.ParseResult<T> => {
    return Papa.parse(csv, options);
  },

  unparse: <T = any>(data: T[], options?: Papa.UnparseConfig): string => {
    return Papa.unparse(data, options);
  },

  parseFile: <T = any>(file: File, options?: Papa.ParseConfig<T>): Promise<Papa.ParseResult<T>> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        ...options,
        complete: (results) => resolve(results),
        error: (error) => reject(error),
      });
    });
  },
};
