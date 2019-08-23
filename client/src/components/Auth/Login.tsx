import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBar from '../../components/AlertBar';
// CSS
// import { LoginStyles } from './LoginStyles';

const REQUEST_LOGIN = gql`
  mutation REQUEST_LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        password
      }
    }
  }
`
interface Props {
  checkForLogin: ({ key: string }: any) => void;
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
}

function LoginForm(props: Props) {
  // const classes = LoginStyles();
  const { checkForLogin, auth, closeModal, modal } = props;
  const [errorState, setErrorState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // const pwdGuest = process.env.REACT_APP_GUEST_PASSWORD;
  const [requestLogin, { loading, data, error }] = useMutation(REQUEST_LOGIN);

  const validate = () => {
    console.log('validate', !email, !password)
    if (!email && !password) {
      setErrorMsg('Please enter your email and password');
      return false;
    }
    if (!email) {
      setErrorMsg('Please enter your email');
      return false;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return false;
    }
    return true;
  }

  // const handleGuestLogin = () => {
  //   console.log('Login as Guest');
  //   if (errorState) {
  //     setErrorState(false);
  //   }
  //   setTriggerLogin(true);
  //   setLoggedIn(true);
  //   checkForLogin({ id: 'guest', pwd: pwdGuest });
  // };

  const whichError = (msg: string | null) => {
    if ( typeof msg == 'string') {
      const emailErr = msg.indexOf('email') !== -1;
      const passwordErr = msg.indexOf('password') !== -1;
      if (emailErr && passwordErr) return 'both';
      if (emailErr) return 'email';
      if (passwordErr) return 'password';
    }
  }

  const clearError = () => {
    setErrorMsg('');
    setErrorState(false);
  }

  const handleEValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    clearError();
    setEmail(email);
  }

  const handlePwdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    clearError();
    setPassword(password);
  }

  useEffect(() => {
    // if authentication fails in server
    if (error) setErrorMsg("Incorrect email or password");
    // update error state in state when errorMsg state changes
    if (errorMsg) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  }, [errorMsg, error]);

  // when login component unmounts reset loggedIn state
  useEffect(() => {
    return () => {
      console.log('login unmount');
      setLoggedIn(false);
    }
  }, [])

  return (
    <form action="/" method="post" onSubmit={async e => {
      e.preventDefault();
      const isValid = await validate();
      if (!isValid) return;
      await setTimeout(() => requestLogin({ variables: { email, password } }), 2000);
      if (error) return;
      setLoggedIn(true);
      checkForLogin({ email });
    }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <AlertBar open={errorState} message={errorMsg as string} variant="error" />
        <AlertBar open={loggedIn} message="Login Success" variant="success" />
        <TextField
          id="input-email"
          label="Email"
          // className={classes.textfield}
          type="text"
          autoComplete="off"
          margin="dense"
          variant="outlined"
          // defaultValue="Guest"
          // value={triggerLogin ? 'Guest' : eValue}
          onChange={handleEValue}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={whichError(errorMsg) === 'email' || whichError(errorMsg) === 'both' ? true : false}
        />
        <TextField
          id="input-pwd"
          label="Password"
          // className={classes.textfield}
          type="password"
          autoComplete="current-password"
          margin="dense"
          // value={triggerLogin ? pwdGuest : pwdValue}
          onChange={handlePwdValue}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={whichError(errorMsg) === 'password' || whichError(errorMsg) === 'both' ? true : false}
        />
          <Button
            type="submit"
            variant="outlined"
            // className={classes.buttonGen}
            // onClick={handleLogin}
          >
            Login
          </Button>
          {/* <Button variant="outlined" className={classes.buttonGuest} onClick={handleGuestLogin}>Login as Guest</Button> */}
      </fieldset>
    </form>
  );
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(LoginForm);
