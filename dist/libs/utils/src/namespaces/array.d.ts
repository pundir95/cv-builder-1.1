import type { LayoutLocator } from "./types";
export declare const findItemInLayout: (item: string, layout: string[][][]) => LayoutLocator | null;
export declare const removeItemInLayout: (item: string, layout: string[][][]) => LayoutLocator | null;
export declare const moveItemInLayout: (current: LayoutLocator, target: LayoutLocator, layout: string[][][]) => string[][][];
