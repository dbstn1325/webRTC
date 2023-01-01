import { css, SerializedStyles } from "@emotion/react";

export function widthStyle(width: string): SerializedStyles {
  return css`
    width: ${width};
  `;
}
