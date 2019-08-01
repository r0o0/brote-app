import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import { withStyles } from '@material-ui/styles';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// CSS
import { LoginStyles } from './LoginStyles';

function Login(props: any) {
  const { classes, checkForLogin } = props;
  const { root, loginBox, textfield } = classes;
  const [triggerLogin, setTriggerLogin] = useState(false);
  const pwd = process.env.REACT_APP_GUEST_PASSWORD;

  const handleGuestLogin = () => {
    console.log('Login as Guest');
    setTriggerLogin(true);
    checkForLogin({ id: 'guest', pwd, });
    document.cookie = 'user=guest';
    document.cookie = 'user_session='
  };

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
        />
        <TextField
          id="input-pwd"
          label="Password"
          className={textfield}
          type="password"
          autoComplete="current-password"
          margin="dense"
          value={triggerLogin ? pwd : ''}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleGuestLogin}>Login as Guest</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(LoginStyles)(connect(null, actions)(Login));
