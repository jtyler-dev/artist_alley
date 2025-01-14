"use client";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { BasicEditorMenu } from "./BasicEditorMenu";

export interface TiptapProps {
  initialContent?: Content;
  maxCharacterCount?: number;
}

const Tiptap = ({ initialContent, maxCharacterCount }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      Underline,
      Highlight,
      TaskItem,
      TaskList,
      ...(maxCharacterCount ? [CharacterCount.configure({ limit: 500 })] : []),
    ],
    content: initialContent,
  });

  return (
    <div>
      <BasicEditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
