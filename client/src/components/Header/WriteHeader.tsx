import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// GraphQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENTS
import Button from '../Button';
import WithUser from './withUser';
// CSS
import * as css from './HeaderStyles';
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
  saveDraft: ({}: { id: any }) => void;
  editor: type.Editor;
  locationPath: string;
  auth: type.Auth;
}

const WriteHeader = (props: Props) => {
  const {
    editor,
    // publishEditor,
    resetEditor,
    openModal,
    locationPath,
    auth,
    saveDraft
   } = props;

  const [readyToPublish, setReadyToPublish] = useState(false);
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
    await createDraft({
      variables: { draft: toSave }
    });
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
    if (locationPath === '/new-story') {
      goodToPublish();
    }
  }, [localTitle, localContent, readyToPublish]);

  return (
    <React.Fragment>
      <div>
        { saved !== null &&
          <span css={css.editorStatus}>
            {!saved ? 'Writing...' : 'Saved'}
          </span>
        }
        <Button
          css={{ marginRight: '10px' }}
          cssemotion={readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]}
          onClick={handleSave}
          value="Save Draft"
        />
        <Button
          cssemotion={!readyToPublish ? cssB.btnDefault : [cssB.btnDefault, cssB.btnActive]}
          onClick={handlePublish}
          value="Publish"
        />
      </div>
      <div css={{
        marginLeft: '16px',
      }}>
        <WithUser />
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
