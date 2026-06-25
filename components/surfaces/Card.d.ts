import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: "default" | "glass" | "feature";
  /** Apply default inner padding. @default true */
  padded?: boolean;
  /** Lift + gold hairline on hover. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** Warm-elevation surface container — default, frosted glass, or bordeaux feature. */
export function Card(props: CardProps): JSX.Element;
