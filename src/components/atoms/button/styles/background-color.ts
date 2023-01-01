import { css, SerializedStyles } from "@emotion/react";

export function setBackgroundStyle(color: string): SerializedStyles {
  return css`
    background-color: ${color};
  `;
}
