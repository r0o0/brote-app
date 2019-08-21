import { css } from '@emotion/core';

export const editor = (editorX: number | null) => css`
  min-height: calc(100vh - ${editorX}px);
  padding: 0 16px;
  font-size: 17px;
  color: var(--text);
  @media(min-width: 1024px) {
    padding: 0 128px 128px;
  }
  label: Editor
`;
