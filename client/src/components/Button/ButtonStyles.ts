import { css } from '@emotion/core';

export const buttonDefault = css`
  width: fit-content;
  padding: 8px 16px;
  border: 1px solid var(--light-60);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--light-60);
  &:hover {
    border-color: var(--light-80);
    color: var(--light-80);
    transition: border 0.12s, background .24s cubic-bezier(0.5, 0.24, 0.8, 1.04);
  }
  label: btn--default;
`;

export const buttonActive = css`
  border-color: var(--primary);
  color: var(--primary);
  &:hover {
    border-color: #fff;
    color: #fff;
    background: var(--primary);
    transition: border 0.12s, background .24s cubic-bezier(0.5, 0.24, 0.8, 1.04);
  }
  &:active {
    background: rgba(214,59,9,0.12);
  }
  label: btn--active;
`;