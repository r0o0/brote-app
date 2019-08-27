import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import FormContent from './FormContent';
// CSS
// import { LoginStyles } from './LoginStyles';

// sign in mutation
const REQUEST_SIGNIN = gql`
  mutation REQUEST_LOGIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        name
        email
        joinedOn
        role
      }
    }
  }
`

// sign up mutation
const REQUEST_SIGNUP = gql`
  mutation REQUEST_SIGNUP($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        name
        email
        joinedOn
        role
      }
    }
  }
`

interface Props {
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
  type: string | null;
}

const AuthForm = (props: Props) => {
  const { loginSuccess, type } = props;
  const [errorState, setErrorState] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [request, { loading, data, error }] = useMutation(type === 'signin' ? REQUEST_SIGNIN : REQUEST_SIGNUP);

  const whichError = (msg: string | null) => {
    if (signedIn) return 'none';
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
    // if Formentication fails in server
    if (error) {
      if (type === 'signin') setErrorMsg("Incorrect email or password");
      if (type === 'signup') setErrorMsg("Email is invalid or already taken");
    }

    // update error state in state when errorMsg state changes
    if (errorMsg) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }

    if (signedIn) {
      if (errorState) setErrorState(false);
    }
  }, [errorMsg, error, signedIn]);

  return (
    <FormContent
      type={type}
      request={request}
      loading={loading}
      error={error}
      data={data}
      errorState={errorState}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      clearError={clearError}
      signedIn={signedIn}
      setSignedIn={setSignedIn}
      loginSuccess={loginSuccess}
      typeOfError={whichError(errorMsg)}
    />
  );
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(AuthForm);
