import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AuthForm from '../../components/AuthForm';
import Button from '../../components/Button';
// CSS
import { DialogStyles } from './AuthStyles';
import * as cssButton from '../../components/Button/ButtonStyles';
// UTILS
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface Props {
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
}

function Auth(props: Props) {
  const { auth, closeModal, modal } = props;
  const [triggerModal, setTriggerModal] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);

  // @material
  const classes = DialogStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setTriggerModal(false);
  }

  const changeFormType = () => {
    if (formType === 'signin') setFormType('signup');
    if (formType === 'signup') setFormType('signin');
  };

  // close modal if user is signed in
  useEffect(() => {
    if (auth.login) closeModal();
  }, [auth]);

  // set form type and trigger modal
  useEffect(() => {
    const { type } = modal;

    if (type !== null && modal) {
      const compare = type.indexOf('sign') !== -1;

      if (compare) setTriggerModal(true);
      setFormType(type.toLowerCase());
    } else {
      setTriggerModal(false);
    }
  }, [modal]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={triggerModal}
      onClose={handleClose}
      aria-labelledby={`form-${formType}`}
      className={classes.root}
    >
      <DialogTitle
        id={`form-${formType}`}
        className={classes.title}
        disableTypography
      >
        { formType === 'signin' ?
          'Sign in to Brote and start writing.' :
          'Join Brote to start writing.'
        }
      </DialogTitle>
      <DialogContent
        className={classes.contentWrapper}
      >
        <DialogContentText>
          { formType === 'signin' ?
            'Sign in to try or test or have fun with Brote app :)' :
            'Join as a user or sign up as a guest if you are just passing  by.'
          }
        </DialogContentText>
        <AuthForm type={formType} />
        <span css={css`
          display: block;
          margin-top: 14px;
        `}>
          {formType == 'signup' ? 'Already a user?' : 'Not yet a user?'}
          <Button
            css={css`
              ${cssButton.btnBaseStyle}
              margin-left: 8px;
              color: var(--primary-text);
              cursor: pointer;
              &:focus {
                outline: none;
              }
            `}
            value={formType == 'signup' ? 'Sign In' : 'Sign Up'}
            onClick={changeFormType}
          />
        </span>
      </DialogContent>
      <DialogActions className={classes.buttonWrapper}>
        <IconButton onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(Auth);
