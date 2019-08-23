import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import AuthForm from './AuthForm';
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
  const { checkForLogin } = props;
  const [errorState, setErrorState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [requestLogin, { loading, data, error }] = useMutation(REQUEST_LOGIN);

  const whichError = (msg: string | null) => {
    if (loggedIn) return 'none';
    if ( typeof msg == 'string') {
      const emailErr = msg.indexOf('email') !== -1;
      const passwordErr = msg.indexOf('password') !== -1;
      if (emailErr && passwordErr) return 'both';
      if (emailErr) return 'email';
      if (passwordErr) return 'password';
    }
  }

  const clearError = () => {
    setErrorMsg(null);
    setErrorState(false);
  }

  useEffect(() => {
    // if authentication fails in server
    if (error) setErrorMsg("Incorrect email or password");
    // if (!error) setErrorMsg(null);
    // update error state in state when errorMsg state changes
    if (errorMsg) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
    // console.log('in login', loggedIn, error);
    if (loggedIn) {
      if (errorState) setErrorState(false);
    }
  }, [errorMsg, error, loggedIn]);

  // when login component unmounts reset loggedIn state
  useEffect(() => {
    return () => {
      console.log('login unmount');
      setLoggedIn(false);
    }
  }, [])

  return (
    <AuthForm
      requestLogin={requestLogin}
      loading={loading}
      error={error}
      errorState={errorState}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      clearError={clearError}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      checkForLogin={checkForLogin}
      typeOfError={whichError(errorMsg)}
    />
  );
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(LoginForm);
