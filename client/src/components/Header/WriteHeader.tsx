import console from 'dev-console.macro';
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
import { Redirect } from 'react-router-dom';
// GraphQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENTS
import Button from '../Button';
import WithUser from './withUser';
import Snackbar from '@material-ui/core/Snackbar';
// CSS
import * as cssH from './HeaderStyles';
import * as cssB from '../Button/ButtonStyles';
// UTILS
import { editorValidator } from '../../utils/editor';
import { getTodayDate } from '../../utils/date';

const CREATE_DRAFT = gql`
  mutation CreateDraft($draft: PostContent!) {
    createDraft( draft: $draft ) {
      id
      title
      content
      savedOn
    }
  }
`;

interface Props {
  resetEditor: () => void;
  openModal: ({}: { type: string }) => void;
  publishEditor: ({}: { key: string }) => void;
  editor: type.Editor;
  auth: type.Auth;
  locationPath: string;
}

const WriteHeader = (props: Props) => {
  const {
    editor,
    // publishEditor,
    resetEditor,
    openModal,
    auth,
    locationPath,
   } = props;

  const [readyToPublish, setReadyToPublish] = useState(false);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [triggerSuccess, setTriggerSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const localTitle = localStorage.title;
  const localContent = localStorage.content;
  const { saved } = editor;

  const [createDraft] = useMutation(CREATE_DRAFT);

  const { title, content, savedOn } = editor.data;

  const postData = {
    title: title == null ? localTitle : title,
    content: content == null ? localContent : content,
  }

  const handleSave = async() => {
    const date = { savedOn };
    const toSave = { ...postData, ...date };

    if (!readyToPublish) {
      setTriggerAlert(true);
      return;
    }

    await createDraft({
      variables: { draft: postData }
    });

    await setTriggerSuccess(true);
    await setTimeout(() => setRedirect(true), 500);

    // reset
    resetEditor();
    localStorage.clear();
  };

  const handlePublish = () => {
    const publishedOn = getTodayDate();
    const date = { publishedOn };
    console.log('published on: ', publishedOn);
    const toPublish = { ...postData, ...date };

    // Todo: need to send to graphql server
    // publishEditor(toPublish);

    // reset
    resetEditor();
    localStorage.clear();

    openModal({ type: 'editor-preview' });
  };

    const checkPublishState = (title: string, content: string) => {
    const isValid = editorValidator(title, content);
    if (isValid) {
      setReadyToPublish(true);
    } else {
      setReadyToPublish(false);
    }
  };

  const goodToPublish = () => {
    const { valid } = editor;
    if (valid === null) {
      checkPublishState(localTitle, localContent);
    } else {
      checkPublishState(localTitle, localContent);
    }
  };

  // check if editor content is ready to publish
  useEffect(() => {
    if (locationPath === '/new-story' || locationPath.indexOf('edit-story') !== -1) {
      goodToPublish();
    }
  }, [localTitle, localContent, readyToPublish]);

  useEffect(() => {
    return () => {
      setTriggerAlert(false);
      setTriggerSuccess(false);
    }
  }, []);

  let user;
  if (auth.info.username) user = auth.info.username;
  if (redirect) return <Redirect to={`/@${user}/stories`} />

  return (
    <React.Fragment>
      <div>
        { saved !== null &&
          <span css={cssH.editorStatus}>
            {!saved ? 'Writing...' : 'Saved'}
          </span>
        }
        <Button
          css={{ marginRight: '10px' }}
          cssemotion={readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]}
          onClick={handleSave}
          value="Save Draft"
        />
        {/* <Button
          cssemotion={!readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]}
          onClick={handlePublish}
          value="Publish"
        /> */}
      </div>
      <div css={{
        marginLeft: '16px',
      }}>
        <WithUser />
      </div>
      <div css={cssH.snackbar}>
        <Snackbar
          data-type="error"
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={triggerAlert}
          autoHideDuration={1000}
          message="Your story is empty :("
          onClose={() => setTriggerAlert(false)}
        />
        <Snackbar
          data-type="success"
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={triggerSuccess}
          message="Your story is saved :)"
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  router: store.router,
  auth: store.auth,
});

export default connect(mapStateToProps, actions)(WriteHeader);
