// Preview.js
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
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
import { button } from './PreviewStyles';
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

function Preview(props: Props) {
  const { editor, modal, classes, closeModal } = props;
  const { title, content, publishedOn } = editor.data;
  const { appbar, toolbar, toolbarHeader } = classes;

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
          <Article title={title} content={content} author={'test'} publishedOn={publishedOn} />
        </div>
      </Dialog>
  );
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  modal: store.modal,
});

export default withStyles(styles)(connect(mapStateToProps, actions)(Preview));
