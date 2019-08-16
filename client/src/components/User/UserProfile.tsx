import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// UTILS
import { getCookie } from '../../utils/cookie';

const UserButton = css`
  margin-left: 16px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #2777f9;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
  label: user--profile;
`;

function UserProfile() {
  let initial;
  const user = getCookie('user');
  if (user) {
    initial = user.charAt(0);
  }

  return (
    <button
      css={UserButton}
    >
      {initial}
    </button>
  )
}

export default UserProfile;
