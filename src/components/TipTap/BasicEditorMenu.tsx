import { Editor } from "@tiptap/react";
import { EditorMenuButton } from "./EditorMenuButton";
import {
  Baseline,
  Bold,
  Italic,
  Strikethrough,
  Undo,
  Redo,
  List,
  ListOrdered,
} from "lucide-react";
import {
  BasicEditorMenuOption,
  EditorMenuButtonType,
  EditorOptionType,
} from "./types";

export interface BasicEditorMenuProps {
  editor: Editor | null;
}

export const BasicEditorMenu = ({ editor }: BasicEditorMenuProps) => {
  if (!editor) return null;

  const buttons: BasicEditorMenuOption[] = [
    {
      icon: <Undo />,
      ariaLabel: "Undo",
      toolTip: "Undo",
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo />,
      ariaLabel: "Redo",
      toolTip: "Redo",
      onClick: () => editor.chain().focus().redo().run(),
    },
    {
      type: EditorOptionType.SEPARATOR,
    },
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      ariaLabel: "Bold",
      toolTip: "Bold",
    },
    {
      icon: <Baseline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      ariaLabel: "Underline",
      toolTip: "Underline",
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      ariaLabel: "Italic",
      toolTip: "Italic",
    },
    {
      type: EditorOptionType.SEPARATOR,
    },
    {
      icon: <Strikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strikethrough"),
      ariaLabel: "Strikethrough",
      toolTip: "Strikethrough",
    },
    {
      icon: <List />,
      ariaLabel: "Bullet List",
      toolTip: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered />,
      ariaLabel: "Numbered List",
      toolTip: "Numbered List",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("numberList"),
    },
  ];

  return (
    <div className="mb-2 flex items-center space-x-2">
      {buttons.map((data, index) => {
        if (data.type === "separator") {
          return <div key={index} className="w-px h-6 bg-gray-200" />;
        }

        const { icon, onClick, isActive, ariaLabel, toolTip } =
          data as EditorMenuButtonType;
        return (
          <EditorMenuButton
            key={index}
            onClick={onClick}
            isActive={isActive}
            isDisabled={false}
            ariaLabel={ariaLabel}
            tooltip={toolTip}
          >
            {icon}
          </EditorMenuButton>
        );
      })}
    </div>
  );
};
