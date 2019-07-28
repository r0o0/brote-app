import { css } from '@emotion/core';

export const editor = (editorX: number | null) => css`
  min-height: calc(100vh - ${editorX}px);
  padding: 0 16px;
  font-size: 17px;
  color: var(--text);
  @media(min-width: 1024px) {
    padding: 0 128px;
  }
  label: Editor
`;

export const codeblock = css`
  white-space: pre-wrap;
  // margin: 0 40px;
  padding: 16px 20px;
  background: var(--light-90);
  label: Editor-codeblock;
`;

export const blockquote = css`
  border-left: 3px solid var(--light-md);
  // margin: 0 24px;
  padding: 6px 0;
  padding-left: 20px;
  span {
    word-break: break-all;
    color: var(--light-md);
  }
  label: Editor-blockquote;
`;