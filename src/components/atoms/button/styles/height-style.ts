import { css, SerializedStyles } from "@emotion/react";

export function heightStyle(height: string): SerializedStyles {
  return css`
    height: ${height};
  `;
}
