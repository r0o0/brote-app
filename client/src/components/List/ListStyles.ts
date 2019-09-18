import { css } from '@emotion/core';

export const wrapper = css`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--light-80);
  // background: #eee;
  @media (min-width: 720px) {
    flex-flow: row wrap;
    justify-content: space-between;
  }
  @media (max-width: 720px) {
    position: relative;
  }
  label: post-wrapper;
`;

export const postContent = css`
`;

export const title = css`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
  text-transform: capitalize;
  @media (min-width: 720px) {
    font-size: 28px;
  }
  label: post-title;
`;

export const text = css`
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--light-40);
  @media (min-width: 720px) {
    font-size: 16px;
  }
  label: post-text;
`;

export const date = css`
  display: block;
  font-size: 12px;
  margin-bottom: 12px;
  color: var(--light-50);
  & b {
    font-weight: 400;
    color: var(--light-20);
  }
  @media (min-width: 320px) {
    position: absolute;
    left: 0;
    bottom: 11px;
  }
  @media (min-width: 720px) {
    position: static;
    font-size: 13px;
  }
  label: post-date;
`;

export const postActions = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  @media (min-width: 720px) {
    flex-flow: column wrap;
    justify-content: space-between;
  }
  label: post-actions;
`;

export const btnEdit = css`
  align-self: flex-end;
  padding-top: 0 !important;
  & > span {
    font-size: 18px;
    & > span {
      font-size: 18px;
      color: var(--light-60);
    }
  }
  &:hover {
    background: transparent !important;
    @media (min-width: 720px) {
      &::after {
        content: 'Edit';
        font-size: 14px;
        padding-left: 6px;
      }
    }
  }
  @media (max-width: 720px) {
    position: absolute !important;
    top: 0;
    right: 0;
  }
  label: post-btn-edit;
`;

export const btnWrapper = css`
  display: flex;
  & > * {
    margin-left: 10px;
  }
  & > a {
    order: 3;
  }
  @media (min-width: 720px) {
    margin-bottom: 8px;
  }
  label: post-btn-wrapper;
`;

export const btnDel = css`
  padding: 5px 8px;
  label: post-btn-delete;
`;

export const btnPublish = css`
  padding: 5px 8px;
  border-color: var(--primary);
  color: var(--primary);
  label: post-btn-publish;
`;


// ---------------
// CheckDelete.tsx

export const dialog = css`
  & .MuiDialog-paper {
    padding: 20px;
  }
  label: dialog;
`;

export const dialogTitle = css`
  & > h6 {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 24px;
    line-height: 1.15em;
  }
  label: dialog-title;
`;

export const dialogContent = css`
  & > * {
    font-size: 16px;
    line-height: 1.15em;
    color: var(--text);
  }
  & strong {
    color: var(--primary);
  }
  & span {
    margin: 20px 0 5px;
    display: block;
  }
  label: dialog-content;
`;

export const textfield = css`
  & > div {
    padding-bottom: 4px;
    font-family: IBM Plex Sans, sans-serif;
    line-height: 1.25em;
    &::before {
      border-color: var(--light-60);
    }
    &::after {
      border-color: var(--primary);
    }
  }
  label: dialog-textfield;
`;

export const dialogFooter = css`
  padding: 8px 24px !important;
  label: dialog-footer;
`;
