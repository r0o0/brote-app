import console from 'dev-console.macro';
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link, Switch, Route } from 'react-router-dom';
// COMPONENTS
import UserProfile from '../../components/User/UserProfile';
import Activity from './Activity';
import Stories from './Stories';
import Button from '../../components/Button';
// CSS
import * as css from './UserPageStyles';
import * as cssB from '../../components/Button/ButtonStyles';

interface Props {
  location: any;
}

function User(props: Props) {
  const { location } = props;
  let user;
  if (!location.state) user = location.pathname.split('/')[1].replace('@', '');
  if (location.state) user = location.state.user;
  console.log('user', user, location);
  return (
    <div className="container" css={css.UserContainer}>
      <div css={css.UserHeaderWrapper}>
        <div className="user-info">
          <div className="user-info--header">
            <h2 css={css.UserTitle}>{user}</h2>
            <Button
              value="Edit Profile"
              css={{
                padding: '4px 10px',
                height: 'fit-content',
                marginLeft: '20px',
                marginBottom: '2px',
              }}
              cssemotion={cssB.btnDefault}
            />
          </div>
          <p className="user-msg">Set profile message</p>
          <Link to=''><span className="user-following">Following 3</span></Link>
        </div>
        <div
          className="user-profile"
          css={{
            width: '80px',
            height: '80px',
            fontSize: '36px',
          }}
        >
          <UserProfile user={user} />
        </div>
      </div>
      <div css={css.UserContentWrapper}>
        <Switch>
          <Route path="/@:user/stories" component={Stories} />
        </Switch>
      </div>
    </div>
  )
}

export default User;
