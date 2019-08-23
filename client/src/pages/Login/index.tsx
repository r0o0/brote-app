import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBar from '../../components/AlertBar';
import LoginForm from '../../components/Auth/Login';
// CSS
import { LoginStyles } from './LoginStyles';

interface Props {
  checkForLogin: ({ key: string }: any) => void;
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
}

function Login(props: Props) {
  const classes = LoginStyles();
  const { checkForLogin, auth, closeModal, modal } = props;
  const [triggerLogin, setTriggerLogin] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pwdGuest = process.env.REACT_APP_GUEST_PASSWORD;
  const { error_message, isError } = auth;

  useEffect(() => {
    // close Login modal
    if (loggedIn) {
      closeModal();
    }
  }, [loggedIn]);

  return (
    <Dialog
      open={modal.status}
      aria-labelledby="form-login"
      className={classes.root}
    >
      <DialogTitle
        id="form-login"
        className={classes.title}
        disableTypography
      >
        Login
      </DialogTitle>
      <DialogContent
        className={classes.loginBox}
      >
        {loggedIn ? <AlertBar open={loggedIn} message="Logged In Successfully :)" variant="success"/> : null}
        <DialogContentText>
          Login as guest user to try Brote App
        </DialogContentText>
        <LoginForm />
      </DialogContent>
      <DialogActions className={classes.buttonWrapper}>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(Login);
