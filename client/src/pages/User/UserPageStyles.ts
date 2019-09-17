import { css } from '@emotion/core';

export const UserContainer = css`
  margin: 24px auto;
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
`;

export const UserHeaderWrapper = css`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  margin-bottom: 40px;
  .user-info {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    .user-info--header {
      display: flex;
      align-items: flex-end;
      width: 100%;
      margin-bottom: 24px;
    }
    .user-msg {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 400;
    }
    .user-following {
      font-size: 14px;
      color: var(--light-50);
    }
  }
  .user-profile {
    order: -1;
    margin-right: 32px;
  }
`;

export const UserTitle = css`
  font-size: 36px;
  text-transform: capitalize;
`;

export const UserContentWrapper = css`
  width: 100%;
`;