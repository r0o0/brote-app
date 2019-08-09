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

export const image = css`
  margin: 0 auto;
  width: 100%;
  max-width: 450px;
  height: auto;
  margin-left: 50%;
  transform: translateX(-50%);
  label: Editor-image;
`;