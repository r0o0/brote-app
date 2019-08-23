import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// COMPONENTS
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import icons from './iconsData';
// CSS
import { AlertBarStyles } from './AlertBarStyles';

interface Props {
  open: boolean;
  autoHideDuration?: number;
  message: string;
  variant: keyof typeof icons;
}

function AlertBar(props: Props) {
  const classes = AlertBarStyles();
  const { open, message, variant } = props;
  const [alertOpen, setAlertOpen] = useState(open);
  const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    if (alertOpen !== open) setAlertOpen(open);
  }, [open]);

  return (
    <div>
      <Snackbar
        className={classes.root}
        open={alertOpen}
      >
        <SnackbarContent
          className={clsx(classes.contentRoot, classes[variant])}
          aria-describedby="client-snackbar"
          message={
            <span
              id="client-snackbar"
              className={classes.message}
            >
              <Icon className={classes.icon}>{icons[variant]}</Icon>
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
              <Icon className={classes.icon}>close</Icon>
            </IconButton>
          ]}
      />
      </Snackbar>
    </div>
  )
}

export default AlertBar;
