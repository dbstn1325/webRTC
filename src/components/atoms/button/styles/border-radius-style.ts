import { css, SerializedStyles } from "@emotion/react";

export function borderRadiusStyle(radius: string): SerializedStyles {
  return css`
    border-radius: ${radius};
  `;
}
