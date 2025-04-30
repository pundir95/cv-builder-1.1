import { Editor, EditorContentProps } from '@tiptap/react';
export declare const RichInput: import('react').ForwardRefExoticComponent<{
    content?: string;
    onChange?: (value: string) => void;
    hideToolbar?: boolean;
    className?: string;
    editorClassName?: string;
    footer?: (editor: Editor) => React.ReactNode;
} & Omit<EditorContentProps, "value" | "ref" | "className" | "content" | "onChange" | "editor"> & import('react').RefAttributes<Editor>>;
