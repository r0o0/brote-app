import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import { withStyles } from '@material-ui/styles';
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
  classes: any;
  checkForLogin: ({ key: string }: any) => void;
  auth: type.Auth;
}

function Login(props: Props) {
  const { classes, checkForLogin, auth } = props;
  const { root, loginBox, textfield } = classes;
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
  }, [error_message]);

  return (
    <Dialog
      // className={loginBox}
      open={true}
      aria-labelledby="form-login"
      className={root}
    >
      <DialogTitle id="form-login">Login</DialogTitle>
      <DialogContent
        className={loginBox}
      >
        <DialogContentText>
          {errorState ? <AlertBar open={errorState} message={error_message ? error_message : ''} variant="error"/> : null}
          {loggedIn ? <AlertBar open={loggedIn} message="Logged In Successfully :)" variant="success"/> : null}
          Login as guest user to try Brote App
        </DialogContentText>
        <TextField
          id="input-username"
          label="Username"
          className={textfield}
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
          className={textfield}
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
      <DialogActions>
      <Button variant="outlined" onClick={handleLogin}>Login</Button>
        <Button variant="outlined" onClick={handleGuestLogin}>Login as Guest</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
});

export default withStyles(LoginStyles)(connect(mapStateToProps, actions)(Login));
