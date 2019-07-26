import { css } from '@emotion/core';
import '../../colors.css';

export const previewArticle = css`
  width: inherit;
  padding: 16px 0;
  label: Article-preview;
`;

export const previewTitle = css`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2em;
  color: var(--text);
  @media(min-width: 720px) {
    font-size: 24px;
  }
  @media(min-width: 1024px) {
    font-size: 26px;
  }
  label: Article-preview-title;
`;

export const previewP = css`
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.2em;
  color: var(--light-md);
  label: Article-preview-p;
`;