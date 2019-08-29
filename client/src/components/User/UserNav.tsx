import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
// COMPONENTS
import Popover from '@material-ui/core/Popover';
import UserProfile from './UserProfile';
// CSS
import { UserNavStyles } from './UserNavStyles';
import * as css from './UserNavStyles';

interface Props {
  id: string;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  user: string | undefined;
}

function UserNav(props: Props) {
  const classes = UserNavStyles();
  const { id, anchorEl, onClose, user } = props;
  console.log('nav', user);
  return (
    <div>
      <Popover
        id={id}
        className={classes.root}
        open={Boolean(anchorEl)}
        onClose={onClose}
        elevation={0}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div css={css.UserContainer}>
          <h2 css={css.User}>{user}</h2>
          <div css={{
            width: '40px',
            height: '40px',
            marginRight: '16px',
          }}>
            <UserProfile user={user ? user : ''} />
          </div>
        </div>
        <ul css={css.menuList}>
          <li>New Story</li>
          <li>Stories</li>
          <li><Link to={{
            pathname: `/@${user}`,
            state: {
              user,
            }
          }}
          >Profile</Link></li>
          <li>Settings</li>
          <li>Sign Out</li>
        </ul>
      </Popover>
    </div>
  )
}

export default UserNav;
