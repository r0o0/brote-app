import { css } from '@emotion/core';

export const wrapper = css`
  @media(min-width: 1024px) {
    max-width: 1440px;
    margin: 0 auto;
  }
`;

export const inputTitle = css`
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  padding: 0 16px;
  border: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 28px;
  color: var(--text);
  &::placeholder {
    opacity: 0.33;
  }
  &:focus {
    outline: none;
  }
  @media(min-width: 1024px) {
    padding: 0 128px;
    font-size: 38px;
  }
  label: input--title;
`;
