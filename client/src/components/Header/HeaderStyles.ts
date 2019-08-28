import { css } from '@emotion/core';

export const header = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  transition: padding-top 0.34s cubic-bezier(0.13, 0.59, 0.8, 1.04);
  @media(min-width: 720px) {
    padding: 16px 40px;
  }
  @media(min-width: 1440px) {
    padding: 16px 80px;
  }
  label: global-header;
`;

export const headerBig = css`
  padding: 20px 16px;
  transition: padding-top 0.34s cubic-bezier(0.57, 0.38, 0.37, 0.63);
  @media(min-width: 720px) {
    padding: 24px 40px;
  }
  @media(min-width: 1440px) {
    padding: 24px 80px;
  }
  label: header-big;
`;

export const headerRight = css`
  display: flex;
  align-items: center;
  label: header__right;
`;

export const h1 = css`
  font-size: 24px;
  &:hover {
    color: var(--primary);
  }
  label: logo;
`;

export const editorStatus = css`
  margin-right: 12px;
  font-weight: bold;
  font-size: 14px;
  color: var(--light-md);
  label: editor-status;
`;