import { css, SerializedStyles } from "@emotion/react";

export function fonrSizeStyle(radius: string): SerializedStyles {
  return css`
    border-radius: ${radius};
  `;
}
