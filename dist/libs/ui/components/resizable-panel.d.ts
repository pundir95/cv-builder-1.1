import * as PanelPrimitive from "react-resizable-panels";
export declare const PanelGroup: import('react').ForwardRefExoticComponent<Omit<import('react').HTMLAttributes<keyof HTMLElementTagNameMap>, "id"> & {
    autoSaveId?: string | null | undefined;
    className?: string | undefined;
    direction: import('react-resizable-panels/dist/declarations/src/types').Direction;
    id?: string | null | undefined;
    keyboardResizeBy?: number | null | undefined;
    onLayout?: PanelPrimitive.PanelGroupOnLayout | null | undefined;
    storage?: PanelPrimitive.PanelGroupStorage | undefined;
    style?: import('react').CSSProperties | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
    dir?: "auto" | "ltr" | "rtl" | undefined;
} & {
    children?: import('react').ReactNode;
} & import('react').RefAttributes<PanelPrimitive.ImperativePanelGroupHandle>>;
export declare const Panel: import('react').ForwardRefExoticComponent<Omit<import('react').HTMLAttributes<HTMLDivElement | HTMLElement | HTMLObjectElement | HTMLMapElement | HTMLTableCellElement | HTMLTableRowElement | HTMLStyleElement | HTMLAnchorElement | HTMLQuoteElement | HTMLBRElement | HTMLTableColElement | HTMLDataElement | HTMLDListElement | HTMLHeadingElement | HTMLHRElement | HTMLImageElement | HTMLLIElement | HTMLOListElement | HTMLParagraphElement | HTMLPreElement | HTMLSpanElement | HTMLTableElement | HTMLTableSectionElement | HTMLTimeElement | HTMLUListElement | HTMLButtonElement | HTMLFormElement | HTMLInputElement | HTMLLabelElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLBodyElement | HTMLCanvasElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLHeadElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLegendElement | HTMLLinkElement | HTMLMetaElement | HTMLMeterElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLProgressElement | HTMLSlotElement | HTMLScriptElement | HTMLSelectElement | HTMLSourceElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTitleElement | HTMLTrackElement | HTMLVideoElement | HTMLTableCaptionElement | HTMLMenuElement | HTMLPictureElement>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: PanelPrimitive.PanelOnCollapse | undefined;
    onExpand?: PanelPrimitive.PanelOnExpand | undefined;
    onResize?: PanelPrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import('react').ReactNode;
} & import('react').RefAttributes<PanelPrimitive.ImperativePanelHandle>>;
type PanelResizeHandleProps = React.ComponentProps<typeof PanelPrimitive.PanelResizeHandle> & {
    isDragging?: boolean;
};
export declare const PanelResizeHandle: ({ className, isDragging, onDragging, ...props }: PanelResizeHandleProps) => import("react/jsx-runtime").JSX.Element;
export {};
