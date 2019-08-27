import { makeStyles, Theme } from '@material-ui/core/styles';

export const DialogStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    '& input.MuiInputBase-input': {
      height: '32px',
    },
    '& div.MuiDialog-paper': {
      padding: '48px 56px',
      [theme.breakpoints.down('sm')]: {
        padding: '64px 40px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '64px 16px',
      }
    }
  },
  contentWrapper: {
    width: '100%',
    padding: '24px 0 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '32px 0',
    }
  },
  title: {
    padding: '0',
    fontSize: '26px',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '32px',
      lineHeight: '1.25em',
    }
  },
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
}));