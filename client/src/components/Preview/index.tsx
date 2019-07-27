// Preview.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
import { Link } from 'react-router-dom';
// COMPONENTS
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// import CloseIcon from '@material-ui/icons/Close';
import Article from '../Article';
// CSS
import '../../globalStyle';
import '../../colors.css';
import { withStyles } from '@material-ui/core';

interface Props {
  editor: type.Editor;
  modal: {
    status: boolean;
  };
  closeModal: () => void;
  classes: {
    appbar: string;
    toolbar: string;
    toolbarHeader: string;
  };
}

const styles = {
  appbar: {
    background: '#fff',
    boxShadow: '0 0 6px 1px rgba(109,105,105,.15)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarHeader: {
    borderRadius: '3px',
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--light-md)',
  }
};

const button = css`
  width: fit-content;
  padding: 8px 16px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
  label: btn--publish;
`;

function Preview(props: Props) {
  const { editor, modal, classes, closeModal } = props;
  console.log('classes', classes);
  const { title, content } = editor.data;
  const { appbar, toolbar, toolbarHeader } = classes;
  console.log('%c state in PREVIEW', 'background: pink; color: wine;', '\n',
    'editor state', editor,
  );
  // const handleClose = () => {

  // };

  return (
    <Dialog
        open={modal.status}
        fullScreen
      >
        <AppBar className={appbar} position="sticky">
          <Toolbar className={toolbar}>
            <Typography className={toolbarHeader}>Preview</Typography>
            <div>
              <IconButton onClick={closeModal}>
                <Icon>edit</Icon>
              </IconButton>
              <Link to="/posts" css={button}>Publish</Link>
            </div>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Article title={title} content={content} />
        </div>
        <button></button>
      </Dialog>
  );
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  modal: store.modal,
});

export default withStyles(styles)(connect(mapStateToProps, actions)(Preview));
