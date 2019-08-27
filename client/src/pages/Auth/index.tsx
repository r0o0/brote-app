import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import * as type from '../../types';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AuthForm from '../../components/AuthForm';
// CSS
import { LoginStyles } from './AuthStyles';

interface Props {
  auth: type.Auth;
  closeModal: () => void;
  modal: type.Modal;
}

function Auth(props: Props) {
  const classes = LoginStyles();
  const { auth, closeModal, modal } = props;
  const [triggerModal, setTriggerModal] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);

  // close modal if user is signed in
  useEffect(() => {
    if (auth.login) closeModal();
  }, [auth]);

  // set form type and trigger modal
  useEffect(() => {
    const { type } = modal;

    if (type !== null && modal) {
      const compare = type.indexOf('sign') !== -1;

      if (compare) setTriggerModal(true);
      setFormType(type.toLowerCase());
    } else {
      setTriggerModal(false);
    }
  }, [modal]);

  return (
    <Dialog
      open={triggerModal}
      aria-labelledby={`form-${formType}`}
      className={classes.root}
    >
      <DialogTitle
        id={`form-${formType}`}
        className={classes.title}
        disableTypography
      >
        { formType === 'signin' ?
          'Sign in to Brote and start writing.' :
          'Join Brote to start writing.'
        }
      </DialogTitle>
      <DialogContent
        className={classes.loginBox}
      >
        <DialogContentText>
          { formType === 'signin' ?
            'Sign in to try or test or have fun with Brote app :)' :
            'Join as a user or sign up as a guest if you are just passing  by.'
          }
        </DialogContentText>
        <AuthForm type={formType} />
      </DialogContent>
      <DialogActions className={classes.buttonWrapper}>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (store: any) => ({
  auth: store.auth,
  modal: store.modal,
});

export default connect(mapStateToProps, actions)(Auth);
