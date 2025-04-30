export declare const templatesList: {
    name: string;
    id: number;
    withPhoto: boolean;
    withoutPhoto: boolean;
    oneColumn: boolean;
    twoColumn: boolean;
}[];
export type Template = (typeof templatesList)[number];
