import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "gold" */
  variant?: "gold" | "feature" | "neutral" | "outline" | "sage";
  children?: React.ReactNode;
}

/** Small uppercase status/label badge. */
export function Badge(props: BadgeProps): JSX.Element;
