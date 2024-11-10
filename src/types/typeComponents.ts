import React, { ReactElement } from "react";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";

export interface CustomModalProps {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
  type?: string | null;
  maxWidth?: "lg" | "md";
}
export interface CustomTooltipProps {
  children: ReactElement;
  title: ReactElement | string;
  align?: "left";
}
export interface InputAutoCompleteProps {
  options: string[];
  placeholder: string;
  onChange: (value: string | null) => void;
}
export interface InputBtnGroupProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  type?: "text" | "number" | "password";
  textBtn: string;
}
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
