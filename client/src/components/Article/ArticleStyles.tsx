import { css } from '@emotion/core';
import '../../colors.css';

export const previewArticle = css`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 32px;
  .preview-info {
    order: 3;
  }
  label: Article-preview;
`;

export const previewTitle = css`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 600;
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
  width: 100%;
  max-height: 20px;
  margin-bottom: 12px;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  line-height: 1.2em;
  color: var(--text-body);
  @media(min-width: 720px) {
    width: inherit;
    max-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
  }
  label: Article-preview-p;
`;

// content html from editor styles
export const content = css`
  font-size: 16px;
  color: var(--text-body);
  h2 {
    margin: 15px 0;
    padding: 1px 0;
    font-size: 24px;
    font-weight: 500;
  }
  h3 {
    margin-bottom: 15px 0;
    padding: 1px 0;
    font-size: 18px;
    font-weight: 500;
  }
  p {
    margin-bottom: 15px;
    padding: 1px 0;
    line-height: 1.7em;
  }
  strong {
    font-weight: 600;
  }
  blockquote {
    display: block;
    margin-bottom: 24px;
    padding-right: 0;
    font-size: 26px;
    line-height: 1.3em;
    color: var(--light-60);
  }
  // code block
  pre {
    width: 100%;
    margin: 20px 0;
    padding: 16px 24px;
    line-height: 1.45em;
    background: var(--light-90);
    white-space: pre-wrap;
  }
  code {
    font-size: 15px;
  }
  label: Article-content;
`;

export const header = css`
  margin-bottom: 24px;
  label: Article-header;
`;

export const title = css`
  margin-bottom: 16px;
  font-size: 36px;
  line-height: 1.2em;
  font-weight: 500;
  color: var(--text);
  text-transform: capitalize;
  label: Article-title;
`;

export const info = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  & .info-detail {
    display: flex;
    flex-flow: column wrap;
    & .author {
      font-weight: 500;
    }
    & :not(.author) {
      font-size: 12px;
    }
  }
  label: Article-info;
`;