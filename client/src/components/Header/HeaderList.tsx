import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
// COMPONENTS
import Button from '../Button';
import UserProfile from '../User/UserProfile';
// CSS
import * as css from './HeaderStyles';
import * as cssB from '../Button/ButtonStyles';

interface Props {
  openModal: ({ type: string }: any) => void;
}

export const Default = (props: Props) => {
  const { openModal } = props;
  const triggerSignInModal = () => {
    openModal({ type: 'signIn' });
  };
  const triggerSignUpModal = () => {
    openModal({ type: 'signUp' });
  };
  return (
    <div>
      <Button cssemotion={cssB.btnSignIn} value="Sign In" onClick={triggerSignInModal} />
      <Button cssemotion={[cssB.btnDefault, cssB.btnActive]} value="Start Writing" onClick={triggerSignUpModal} />
    </div>
  );
};

interface LoggedInProps {
  onClick?: () => void;
  locationPath: string;
  saved?: boolean | null;
  readyToPublish?: boolean;
}

export const LoggedIn = (props: LoggedInProps) => {
  const { onClick, saved, locationPath, readyToPublish } = props;
  return (
    <div css={css.headerRight}>
      {locationPath === '/new-story' ?
        <div>
          {saved !== null ? <span css={css.editorStatus}>{!saved ? 'Writing...' : 'Saved'}</span> : null}
          <Button css={{ marginRight: '10px' }} cssemotion={readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]} onClick={onClick} value="Save Draft" />
          <Button cssemotion={!readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]} onClick={onClick} value="Publish" />
        </div> :
        null
      }
      <div css={{
        width: '32px',
        height: '32px',
        marginLeft: '16px',
      }}>
        <UserProfile />
      </div>
    </div>
  );
};
