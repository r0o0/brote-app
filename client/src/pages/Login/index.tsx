import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBar from '../../components/AlertBar';
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
  const [pwdValue, setPwdValue] = useState('');
  const pwdGuest = process.env.REACT_APP_GUEST_PASSWORD;
  const { error_message, isError } = auth;

  const handleLogin = () => {
    console.log('Login');
    setTriggerLogin(false);
    checkForLogin({ id: 'guest', pwd: pwdValue });
  };

  const handleGuestLogin = () => {
    console.log('Login as Guest');
    if (errorState) {
      setErrorState(false);
    }
    setTriggerLogin(true);
    setLoggedIn(true);
    checkForLogin({ id: 'guest', pwd: pwdGuest });
  };

  const handlePwdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPwdValue(e.target.value);
  }

  useEffect(() => {
    if (isError) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
    console.log('modal status', modal.status);
    // close Login modal
    if (loggedIn) {
      closeModal();
    }
  }, [error_message, loggedIn, modal]);

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
        <DialogContentText>
          {errorState ? <AlertBar open={errorState} message={error_message ? error_message : ''} variant="error"/> : null}
          {loggedIn ? <AlertBar open={loggedIn} message="Logged In Successfully :)" variant="success"/> : null}
          Login as guest user to try Brote App
        </DialogContentText>
        <TextField
          id="input-username"
          label="Username"
          className={classes.textfield}
          type="text"
          autoComplete="off"
          margin="dense"
          variant="outlined"
          defaultValue="Guest"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={errorState}
        />
        <TextField
          id="input-pwd"
          label="Password"
          className={classes.textfield}
          type="password"
          autoComplete="current-password"
          margin="dense"
          value={triggerLogin ? pwdGuest : pwdValue}
          onChange={handlePwdValue}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={errorState}
        />
      </DialogContent>
      <DialogActions className={classes.buttonWrapper}>
        <Button variant="outlined" className={classes.buttonGen} onClick={handleLogin}>Login</Button>
        <Button variant="outlined" className={classes.buttonGuest} onClick={handleGuestLogin}>Login as Guest</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(Login);
