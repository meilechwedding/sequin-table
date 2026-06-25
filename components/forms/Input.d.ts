import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Trailing slot (button, badge, unit). */
  trailing?: React.ReactNode;
  /** Error state. @default false */
  invalid?: boolean;
  /** @default "md" */
  size?: "md" | "lg";
}

/** Text input — linen inset surface, gold focus ring, optional icon/trailing slot. */
export function Input(props: InputProps): JSX.Element;
