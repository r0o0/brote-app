import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// GraphQL
import { useMutation } from '@apollo/react-hooks';
import { REQUEST_SIGNIN, REQUEST_SIGNUP, REQUEST_GUEST_SIGNIN, REQUEST_GUEST_SIGNUP } from './Mutation';
// COMPONENTS
import Button from '@material-ui/core/Button';
import FormContent from './FormContent';
// CSS
import {
  FormStyles,
  fieldset,
} from './AuthFormStyles';
// import { LoginStyles } from './LoginStyles';



interface Props {
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
  type: string | null;
}

const AuthForm = (props: Props) => {
  const { loginSuccess, type } = props;

  const classes = FormStyles();

  const [errorState, setErrorState] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const [request, { loading, data, error }] = useMutation(
    !isGuest ?
      type === 'signin' ? REQUEST_SIGNIN : REQUEST_SIGNUP :
      type === 'signin' ? REQUEST_GUEST_SIGNIN : REQUEST_GUEST_SIGNUP
    );

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

  const guestWantsToJoin = () => {
    if (!isGuest) setIsGuest(true);
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
    <React.Fragment>
      <Button
        type="button"
        variant="outlined"
        className={classes.buttonGen}
        onClick={guestWantsToJoin}
      >
        { type === 'signin' ? 'Sign In' : 'Join as a Guest'}
      </Button>
      <span css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 16px 0;
        color: var(--light-50);
        &::before, &::after {
          content: '';
          width: 100%;
          height: 1px;
          background: var(--light-80);
        }
        &::before {
          margin-right: 12px;
        }
        &::after {
          margin-left: 12px;
        }
      `}
      >or</span>
      <FormContent
        type={type}
        guest={isGuest}
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
    </React.Fragment>
  );
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(AuthForm);
