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
  onClick?: () => void;
}

export const Default = (props: Props) => {
  const { onClick } = props;
  return (
    <Button cssemotion={[cssB.buttonDefault, cssB.buttonActive]} value="Login" onClick={onClick} />
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
          <Button css={{ marginRight: '10px' }} cssemotion={readyToPublish ? cssB.buttonDefault : [cssB.buttonDefault, cssB.buttonActive]} onClick={onClick} value="Save Draft" />
          <Button cssemotion={!readyToPublish ? cssB.buttonDefault : [cssB.buttonDefault, cssB.buttonActive]} onClick={onClick} value="Publish" />
        </div> :
        null
      }
      <UserProfile />
    </div>
  );
};
