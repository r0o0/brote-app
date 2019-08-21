import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// COMPONENTS
import UserNav from './UserNav';
// UTILS
import { getCookie } from '../../utils/cookie';

const UserButton = css`
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background: #2777f9;
  font-size: 1em;
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <button
        css={UserButton}
        aria-controls="user-nav"
        onClick={handleClick}
      >
        {initial}
      </button>
      <UserNav id="user-nav" anchorEl={anchorEl} onClose={handleClose} user={user} />
    </React.Fragment>
  )
}

export default UserProfile;
