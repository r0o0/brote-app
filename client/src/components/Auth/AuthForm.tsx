import React, { useState, useEffect } from 'react';
// COMPONENTS
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBar from '../../components/AlertBar';

interface Props {
  type: string | null;
  request: any;
  loading: boolean;
  error: any;
  errorState: boolean;
  errorMsg: string | null;
  setErrorMsg: (arg: string) => void
  clearError: () => void;
  signedIn: boolean;
  setSignedIn: (arg: boolean) => void;
  checkForLogin: ({ email: string }: any) => void;
  typeOfError: string | undefined;
}

const AuthForm = (props: Props) => {
  const {
    type,
    request,
    loading,
    error,
    errorState,
    errorMsg,
    setErrorMsg,
    clearError,
    signedIn,
    setSignedIn,
    checkForLogin,
    typeOfError,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

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
    // on each form submit event
    // note: form is validated on form submit
    if (submit) {
      // if there is no graphql server error
      // user is signedIn
      if (!error) {
        setSignedIn(true);
        checkForLogin({ email });
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
      await request({ variables: { email, password } });

      setSubmit(true);
    }}>
      <fieldset disabled={loading} aria-busy={loading}>
        { errorState ? <AlertBar open={errorState} message={errorMsg as string} variant="error" /> : null }
        <AlertBar open={signedIn} message="Login Success" variant="success" />
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
          error={typeOfError === 'email' || typeOfError === 'both' ? true : false}
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
          error={typeOfError === 'password' || typeOfError === 'both' ? true : false}
        />
          <Button
            type="submit"
            variant="outlined"
            // className={classes.buttonGen}
            // onClick={handleLogin}
          >
            { type === 'signin' ? 'Sign In' : 'Join Brote'}
          </Button>
          {/* <Button variant="outlined" className={classes.buttonGuest} onClick={handleGuestLogin}>Login as Guest</Button> */}
      </fieldset>
    </form>
  );
};

export default AuthForm;