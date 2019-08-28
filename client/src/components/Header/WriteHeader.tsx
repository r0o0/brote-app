import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
// COMPONENTS
import Button from '../Button';
import WithUser from './withUser';
// CSS
import * as css from './HeaderStyles';
import * as cssB from '../Button/ButtonStyles';

interface Props {
  onClick?: () => void;
  locationPath: string;
  saved?: boolean | null;
  readyToPublish?: boolean;
}

const WriteHeader = (props: Props) => {
  const { onClick, saved, locationPath, readyToPublish } = props;
  return (
    <React.Fragment>
      <div>
        {saved !== null ? <span css={css.editorStatus}>{!saved ? 'Writing...' : 'Saved'}</span> : null}
        <Button css={{ marginRight: '10px' }} cssemotion={readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]} onClick={onClick} value="Save Draft" />
        <Button cssemotion={!readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]} onClick={onClick} value="Publish" />
      </div>
      <div css={{
        marginLeft: '16px',
      }}>
        <WithUser />
      </div>
    </React.Fragment>
  );
};

export default WriteHeader;
