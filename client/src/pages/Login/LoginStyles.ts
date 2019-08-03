import { makeStyles, Theme } from '@material-ui/core/styles';
import { blockData } from '../../components/RichEditor/data';

export const LoginStyles = makeStyles((theme: Theme) => ({
  root: {
    '& input.MuiInputBase-input': {
      height: '32px',
    },
    '& div.MuiDialog-paper': {
      padding: '32px 40px',
    }
  },
  loginBox: {
    width: '100%',
    padding: '24px 0 16px',
  },
  title: {
    padding: '0',
    fontSize: '24px',
    fontWeight: 500,
  },
  textfield: {
    marginBottom: '16px',
  },
  buttonWrapper: {
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      '& button.MuiButtonBase-root': {
        width: '100%',
        margin: '0',
        marginBottom: '10px',
      }
    }
  },
  buttonGen: {
    color: 'var(--light-60)',
    borderColor: 'var(--light-60)',
    '&:hover': {
      backgroundColor: 'var(--light-60)',
      color: '#fff',
    }
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