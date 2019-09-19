import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as type from '../../types';
// COMPONENTS
import Button from '../Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
// CSS
import * as cssB from '../Button/ButtonStyles';
import * as cssD from './ListStyles';

interface Props {
  handleDelete: any;
  modal: type.Modal;
  toDelete: { id: string, title: string } | null;
  closeModal: () => void;
}

function CheckDelete(props: Props) {
  const {
    handleDelete,
    modal,
    toDelete,
    closeModal,
  } = props;

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [cancelDelete, setCancelDelete] = useState<boolean>(true);

  // set input value state onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  // close modal
  const handleClose = () => {
    setOpen(false);
    closeModal();
  }

  // delete button onClick
  const handleClick = async () => {
    if (cancelDelete) return;

    // close modal
    await handleClose();
    // request delete to server
    await setTimeout(() => handleDelete(toDelete, false), 300);

  };

  // open modal
  useEffect(() => {
    console.log('modal', modal, open);
    if (modal.status && (modal.type === 'delete-draft' || modal.type === 'delete-published' )) setOpen(true);
  }, [modal.status]);

  // reset input value in dialog: delete post
  useEffect(() => {
    if (open) {
      setInputValue('');
    }
  }, [open]);

  // set input value state onChange
  useEffect(() => {
    if (toDelete) {
      if (inputValue.length !== 0) {
        if (inputValue === toDelete.title) setCancelDelete(false);
        if (inputValue !== toDelete.title) setCancelDelete(true);
      }
    }
  }, [inputValue]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      css={cssD.dialog}
      aria-labelledby="dialog-post-delete"
    >
      <DialogTitle id="dialog-post-delete" css={cssD.dialogTitle}>
        Are you sure you want to delete your story?
      </DialogTitle>
      <DialogContent css={cssD.dialogContent}>
        <p>
          This action cannot be undone. This will permanently delete your story <strong>{toDelete && toDelete.title}</strong>
          <span>
            Please type in the name of the repository to confirm.
          </span>
        </p>
        <TextField
          css={cssD.textfield}
          autoFocus
          margin="dense"
          id="title"
          placeholder={toDelete ? toDelete.title : ''}
          type="text"
          onChange={handleChange}
          value={inputValue}
          fullWidth
        />
      </DialogContent>
      <DialogActions css={cssD.dialogFooter}>
        <Button
          value="Cancel"
          css={[cssB.btnDefault]}
          onClick={handleClose}
        />
        <Button
          value="Delete"
          css={cancelDelete ? [cssB.btnDefault, cssB.btnDisabledState] : [cssB.btnDefault, cssB.btnDelete]}
          onClick={handleClick}
        />
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ modal }: type.ModalState) => ({ modal });

export default connect(mapStateToProps)(CheckDelete);