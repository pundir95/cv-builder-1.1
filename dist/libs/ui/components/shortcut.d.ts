type KeyboardShortcutProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "defaultValue"> & {
    defaultValue?: boolean;
};
export declare const KeyboardShortcut: {
    ({ className, defaultValue, ...props }: KeyboardShortcutProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export {};
