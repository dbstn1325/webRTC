import React, { ReactElement } from "react";
import { defaultStyle } from "./styles";

export interface ButtonProps {
  backgroundColor?: string;
  borderRadius?: string;
  fontSize?: string;
  height: string;
  width: string;
}

export function Button({
  backgroundColor,
  borderRadius,
  fontSize,
  height,
  width,
  ...props
}: ButtonProps): ReactElement {
  return <button></button>;
}
