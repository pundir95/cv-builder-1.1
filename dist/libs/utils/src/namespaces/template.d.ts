export declare const templatesList: {
    name: string;
    id: number;
    withPhoto: boolean;
    withoutPhoto: boolean;
    oneColumn: boolean;
    twoColumn: boolean;
    progress: number;
}[];
export type Template = (typeof templatesList)[number];
