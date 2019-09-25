import React, { useState }from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// GraphQL
import { withApollo, WithApolloClient } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import Popover from '@material-ui/core/Popover';
import UserProfile from './UserProfile';
import UserNavList from './UserNavList';
import Button from '../../components/Button';
// CSS
import { UserNavStyles } from './UserNavStyles';
import * as css from './UserNavStyles';
import * as cssButton from '../../components/Button/ButtonStyles';
// UTILS
import { getCookie } from '../../utils/cookie';
// import { navData } from './UserNavList';

const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signout {
      message
    }
  }
`;

interface Props {
  id: string;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  user: string | undefined;
  client: any;
  signoutSuccess: () => void;
}

function UserNav(props: Props) {
  const classes = UserNavStyles();
  const { id, anchorEl, onClose, user, client, signoutSuccess } = props;
  const [redirect, setRedirect] = useState(false);
  const [signout] = useMutation(SIGN_OUT);
  // console.log(client);

  const handleSignOut = () => {
    setRedirect(true);
    if (getCookie('user')) {
      // clear user cookie
      document.cookie = 'user=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    if (getCookie('expireIn')) document.cookie = 'expireIn=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // reset apollo client cache
    client.cache.reset();
    // signout in server
    signout();
    signoutSuccess();
  };

  if (redirect) return <Redirect to="/" />;

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
        <div css={css.menuListContainer}>
          <ul css={css.menuList}>
            <UserNavList user={user ? user : ''} />
          </ul>
        </div>
        <Button
          css={[cssButton.btnBaseStyle, css.btnSignout]}
          value="Sign Out"
          onClick={handleSignOut}
        />
      </Popover>
    </div>
  )
}

export default connect(null, actions)(withApollo<WithApolloClient<Props>>(UserNav));
