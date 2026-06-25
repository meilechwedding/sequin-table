import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "default" */
  variant?: "default" | "gold" | "bare";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label (icon-only). */
  label?: string;
  /** Icon node (e.g. an inline SVG / Lucide element). */
  children?: React.ReactNode;
}

/** Circular icon-only button — cart, search, favourite, nav controls. */
export function IconButton(props: IconButtonProps): JSX.Element;
