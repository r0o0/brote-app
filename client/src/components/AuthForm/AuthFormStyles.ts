import { css } from '@emotion/core';
import { makeStyles, Theme, withStyles, createMuiTheme } from '@material-ui/core/styles';

export const FormStyles = makeStyles((theme: Theme) => ({
  // textfield root
  root: {
    margin: 0,
  },

  // label
  labelRoot: {
    paddingLeft: '6px',
    paddingRight: '6px',
    fontFamily: 'IBM Plex Sans, sans-serif !important',
    fontSize: '20px !important',
    background: '#fff',
  },
  labelFocused: {
    fontWeight: 500,
    color: 'var(--primary) !important'
  },
  labelError: {
    fontWeight: 500,
  },

  // input
  inputRoot: {
    marginBottom: '16px',
  },
  inputRootNone: {
    marginBottom: '0',
  },
  notchedOutline: {},
  focused: {
    "& $notchedOutline": {
      borderColor: "var(--primary) !important",
      opacity: 0.44
    }
  },

  // buttons
  buttonWrapper: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      top: '16px',
      right: '16px',
    }
  },
  buttonGen: {
    color: 'var(--light-60)',
    borderColor: 'var(--light-60)',
    '&:hover': {
      backgroundColor: 'var(--light-60)',
      color: '#fff',
    },
  },
  buttonGuest: {
    color: 'var(--primary)',
    borderColor: 'var(--primary)',
    '&:hover': {
      backgroundColor: 'var(--primary)',
      color: '#fff',
    },
  }
}));

export const fieldset = css`
  border: 0;
  padding: 0;
  label: form-fieldset;
`;