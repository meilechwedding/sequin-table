import * as React from "react";

export type ButtonVariant = "primary" | "solid" | "feature" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Sequin button — uppercase, tracked, pill-shaped with warm bevel & glow.
 * @startingPoint section="Core" subtitle="Champagne-foil primary button & variants" viewport="700x150"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `primary` = champagne foil. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Render as a different element, e.g. "a". @default "button" */
  as?: "button" | "a";
  /** Optional icon node before the label. */
  iconLeft?: React.ReactNode;
  /** Optional icon node after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/** Sequin button — uppercase, tracked, pill-shaped with warm bevel & glow. */
export function Button(props: ButtonProps): JSX.Element;
