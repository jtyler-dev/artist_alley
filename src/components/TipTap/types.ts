export enum EditorOptionType {
  BUTTON = "button",
  SEPARATOR = "separator",
}

export type EditorMenuButtonType = {
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  ariaLabel: string;
  toolTip?: string;
  type?: EditorOptionType;
};

export type EditorMenuOptionType = {
  type?: EditorOptionType;
};

export type BasicEditorMenuOption = EditorMenuOptionType | EditorMenuButtonType;
