import * as React from "react";

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  /** Element tag. @default "div" */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Tracked all-caps kicker label with a short gold rule, sits above headings. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
