import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as type from '../../types';
// COMPONENTS
import UserProfile from '../User/UserProfile';

interface Props {
  auth: type.Auth;
  userInCookie?: string;
}

function WithUser(props: Props) {
  const { auth, userInCookie } = props;
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const { username } = auth.info;
    if (!auth.login) setUser(null);
    if (auth.login && username) setUser(username);
  }, [auth.login]);

  return (
    <div css={{
      width: '40px',
      height: '40px'
    }}>
      { user ?
        <UserProfile user={user} /> :
        <UserProfile user={userInCookie ? userInCookie : ''} />
      }
    </div>
  );
}

const mapStateToProps = ({ auth }: type.AuthState) => ({ auth });

export default connect(mapStateToProps)(WithUser);
