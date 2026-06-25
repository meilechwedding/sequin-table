import * as React from "react";

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state (only meaningful when interactive). @default false */
  active?: boolean;
  children?: React.ReactNode;
}

/** Pill chip for categories & filters; selectable when given an onClick. */
export function Tag(props: TagProps): JSX.Element;
