import * as React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Show a centered ornament flanked by gold hairlines. @default false */
  ornament?: boolean;
  /** Optional centered label/ornament text (implies ornament). */
  label?: React.ReactNode;
}

/** Thin rule; optionally an ornamented divider with a centered mark. */
export function Divider(props: DividerProps): JSX.Element;
