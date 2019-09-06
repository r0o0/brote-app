import React, { useState, useEffect, useRef } from 'react';
/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
// COMPONENTS
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBar from '../AlertBar';
// CSS
import {
  FormStyles,
  fieldset,
} from './AuthFormStyles';
// UTILS
import { createUsername } from '../../utils/createUsername';
import uniqueId from '../../utils/uniqueId';

interface Props {
  type: string | null;
  guest: boolean;
  request: any; // graphql request signin or signup
  loading: boolean;
  data: any;
  error: any;
  errorState: boolean;
  errorMsg: string | null;
  setErrorMsg: (arg: string) => void
  clearError: () => void;
  signedIn: boolean;
  setSignedIn: (arg: boolean) => void;
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  typeOfError: string | undefined;
}

const FormContent = (props: Props) => {
  const {
    type,
    guest,
    request, // graphql request signin or signup
    loading,
    error,
    data,
    errorState,
    errorMsg,
    setErrorMsg,
    clearError,
    signedIn,
    setSignedIn,
    loginSuccess,
    typeOfError,
  } = props;

  const classes = FormStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guestId, setGuestId] = useState('');
  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [submit, setSubmit] = useState(false);

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const inputToFocus = useRef<HTMLInputElement>(null);

  const validate = () => {
    if (!guest) {
      if (!email && !password) {
        setErrorMsg('Please enter your email and password');
        return false;
      }
      if (!email) {
        setErrorMsg('Please enter your email');
        return false;
      }
    } else {
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return false;
    }
    return true;
  }

  // email input onChange
  const handleEValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!error) clearError();
    setEmail(email);
  }

  // password input onChange
  const handlePwdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (!error) clearError();
    setPassword(password);
  }

  useEffect(() => {
    if (guest) {
      const guestId = uniqueId("Guest");
      setGuestId(guestId);
      if (inputToFocus && inputToFocus.current) {
        inputToFocus.current.focus();
      }
    }
  }, [guest]);

  // check if email value is actually an email using EMAIL_REQEX
  useEffect(() => {
    if (email.length > 0) {
      const isEmail = EMAIL_REGEX.test(email);
      if (!isEmail) setIsEmail(false);
      if (isEmail) setIsEmail(true);
    }
  }, [email]);

  useEffect(() => {
    // on each form submit event
    // note: form is validated on form submit
    if (submit) {
      if (!guest) {
        const { user } = data[type as string];
        const { email, name, role } = user;
        if (!error && user) {
          //if there is no graphql server error
          // user is signedIn
          setSignedIn(true);
          const username = name ? name : createUsername(email);
          document.cookie = `user=${username}`;
          loginSuccess({ email, username, role });
        }
      } else {
        const { guest } = data[`${type}AsGuest`];
        const { name, role } = guest;
        if(!error && guest) {
          setSignedIn(true);
          const email = '';
          const username = name;
          document.cookie = `user=${username}`;
          loginSuccess({ email, username, role });
        }
      }
    }
    return () => setSubmit(false);
  }, [submit]);

  return (
    <form action="/" method="post" onSubmit={async e => {
      e.preventDefault();
      // check if all input fields are filled
      // if validate return false exit submit event
      const isValid = await validate();
      if (!isValid) return;

      // if all fields are filled request login to graphql server
      if (!guest) {
        await request({ variables: { email, password } });
      } else {
        await request({ variables: { name: guestId, password }});
      }

      setSubmit(true);
    }}>
      <fieldset css={fieldset} disabled={loading} aria-busy={loading}>
        { errorState ? <AlertBar open={errorState} message={errorMsg as string} variant="error" /> : null }
        <AlertBar open={signedIn} message="Login Success" variant="success" />
        <div css={css``}>
          <TextField
            id="input-email"
            label={!guest ? "Email" : "Name"}
            type="text"
            autoComplete="off"
            margin="dense"
            variant="outlined"
            className={classes.root}
            value={!guest ? email : guestId}
            disabled={guest ? true : false}
            onChange={handleEValue}
            fullWidth
            // input css override
            InputProps={{
              classes: {
                root: !isEmail && isEmail !== null ? classes.inputRootNone : classes.inputRoot,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              }
            }}
            // input label css override
            InputLabelProps={{
              shrink: true,
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
                error: classes.labelError,
              },
            }}
            error={typeOfError === 'email' || typeOfError === 'both' ? true : false}
          />
          { !isEmail && isEmail !== null &&
            <span css={css`
              display: block;
              margin-top: 5px;
              margin-bottom: 16px;
              font-size: 14px;
              font-weight: 500;
              color: var(--error);
              label: error-notValid;
            `}>Not a valid email address</span>
          }

        </div>
        <TextField
          id="input-pwd"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef={inputToFocus}
          margin="dense"
          // value={triggerLogin ? pwdGuest : pwdValue}
          onChange={handlePwdValue}
          variant="outlined"
          fullWidth
          InputProps={{
            classes: {
              root: classes.inputRoot,
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
            }
          }}
          // input label css override
          InputLabelProps={{
            shrink: true,
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused,
              error: classes.labelError,
            },
          }}
          error={typeOfError === 'password' || typeOfError === 'both' ? true : false}
        />
        <Button
          type="submit"
          variant="outlined"
          className={classes.buttonGen}
          // onClick={handleLogin}
        >
          { type === 'signin' ? 'Sign In' : 'Join Brote'}
        </Button>
      </fieldset>
    </form>
  );
};

// export default withStyles(TextFieldStyles)(FormContent);
export default FormContent;