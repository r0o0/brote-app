import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// COMPONENTS
import UserNav from './UserNav';

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

interface Props {
  user: string;
}

function UserProfile(props: Props) {
  const { user } = props;
  let initial;
  if (user) initial = user.charAt(0);

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
      <UserNav id="user-nav" anchorEl={anchorEl} onClose={handleClose} user={user ? user : ''} />
    </React.Fragment>
  )
}

export default UserProfile;
