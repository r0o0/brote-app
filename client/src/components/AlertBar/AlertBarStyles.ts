import { makeStyles, Theme } from '@material-ui/core/styles';

export const AlertBarStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'static',
    transform: 'translateX(0)',
    marginBottom: '20px',
  },
  contentRoot: {
    flexGrow: 1,
    boxShadow: 'none',
  },
  icon: {
    fontSize: '22px',
    marginRight: '8px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: 'green',
    // border: '1px solid',
    // borderColor: 'green',
  }
}));