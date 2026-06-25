import * as React from "react";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase field label. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  hint?: React.ReactNode;
  /** Error message (overrides hint, turns red). */
  error?: React.ReactNode;
  /** id of the control for the label's htmlFor. */
  htmlFor?: string;
  /** Show a required asterisk. @default false */
  required?: boolean;
  children?: React.ReactNode;
}

/** Labelled wrapper (label + hint/error) around any form control. */
export function Field(props: FieldProps): JSX.Element;
