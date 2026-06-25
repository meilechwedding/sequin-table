import * as React from "react";

/**
 * The Sequin brand mark — ST ring, SEQUIN wordmark, or both.
 * @startingPoint section="Brand" subtitle="ST monogram & Sequin wordmark lockup" viewport="700x150"
 */
export interface MonogramProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "lockup" */
  variant?: "mark" | "lockup" | "wordmark";
  /** Base size in px (drives ring + wordmark). @default 40 */
  size?: number;
  /** Show "Table Linen" tagline under the wordmark. @default false */
  tagline?: boolean;
}

/** The Sequin brand mark — ST ring, SEQUIN wordmark, or both. */
export function Monogram(props: MonogramProps): JSX.Element;
