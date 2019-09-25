import React, { useState, useEffect } from 'react';
/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
// COMPONENTS
import Snackbar from '@material-ui/core/Snackbar';
import Button from '../../components/Button';

const actions = css`
  margin-right: 10px;
  color: #fff;
`;

interface Props {
  trigger: boolean;
}

function RenewAuth(props: Props) {
  const { trigger } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) setOpen(trigger);
  }, []);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      onClose={handleClose}
      autoHideDuration={50000}
      message={<span>Your session will expire in <b>1 minute</b></span>}
      action={
        <Button css={actions} key="btn-finish" value="Got it" onClick={handleClose} />
      }
    />
  )
}

export default RenewAuth;
