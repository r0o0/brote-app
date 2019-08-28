import { css } from '@emotion/core';

export const main = css`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  min-height: calc(100vh - 64px);
`;

export const wrapper = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  margin-top: -192px;
  @media(min-width: 720px) {
    padding: 0 40px;
    transition: padding 0.34s cubic-bezier(0.13, 0.59, 0.8, 1.04);
  }
  @media(min-width: 1024px) {
    padding: 0 80px;
    padding: 0 calc(100vw / 12.8);
    flex-flow: column wrap;
    align-content: flex-start;
  }
`;

export const button = css`
  display: block;
  align-self: center;
  flex-basis: auto;
  padding: 12px 20px;
  border: 2px solid var(--primary);
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-text);
  label: btn--write;
  &:hover {
    border-color: #fff;
    color: #fff;
    background: var(--primary);
    transition: border 0.12s, background .24s cubic-bezier(0.5, 0.24, 0.8, 1.04);
  }
  &:active {
    background: rgba(214,59,9,0.12);
  }
  @media(min-width: 1024px) {
    align-self: flex-start;
  }
`;

export const paragraph = css`
  margin-bottom: 34px;
  font-size: 38px;
  font-weight: 500;
  line-height: 46px;
  color: var(--text);
  @media(min-width: 1024px) {
    margin-bottom: 40px;
    font-size: calc(48px + 20 * ((100vw - 1024px) / 896));
    line-height: 1.15em;
    transition: line-height 0.12s, font-size 0.15s cubic-bezier(0.15, 0.5, 0.8, 1.04);
  }
`;

export const span = css`
  font-weight: 600;
  color: var(--primary-text);
`;