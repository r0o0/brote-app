import { css } from '@emotion/core';

export const btnBaseStyle = css`
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  label: btn-baseStyle;
`;


export const btnDefault = css`
  ${btnBaseStyle};
  padding: 8px 16px;
  border: 1px solid var(--light-60);
  border-radius: 5px;
  color: var(--light-60);
  &:hover {
    // border-color: var(--light-80);
    color: var(--light-80);
    transition: border 0.12s, background .24s cubic-bezier(0.5, 0.24, 0.8, 1.04);
  }
  label: btn--default;
`;

export const btnActive = css`
  border-color: var(--primary);
  color: var(--primary);
  &:hover {
    color: #fff;
    background: var(--primary);
    transition: border 0.12s, background .24s cubic-bezier(0.5, 0.24, 0.8, 1.04);
  }
  &:active {
    background: rgba(214,59,9,0.12);
  }
  label: btn--active;
`;

export const btnSignIn = css`
  ${btnBaseStyle};
  margin-right: 20px;
  color: var(--primary);
  font-weight: 600;
  label: btn--login;
`;

export const btnDelete = css`
  ${btnBaseStyle};
  border-color: var(--error);
  color: var(--error);
  label: btn--delete;
`;

export const btnDisabledState = css`
  opacity: 0.3;
  label: btn-disabled;
`;