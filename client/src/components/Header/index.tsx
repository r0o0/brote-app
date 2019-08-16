// Header.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import * as type from '../../types';
// GraphQL
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// COMPONENTS
import { Default, LoggedIn } from './HeaderList';
// UTILS
import { editorValidator } from '../../utils/editor';
import { getTodayDate } from '../../utils/date';
// CSS
import * as css from './HeaderStyles';

const CREATE_DRAFT = gql`
  mutation CreateDraft($title: String!, $author: String!, $content: String!) {
    createDraft(title: $title, author: $author, content: $content) {
      id,
      title,
      author,
      content,
      isPublished
    }
  }
`;

interface Props {
  resetEditor: () => void;
  openModal: () => void;
  publishEditor: ({ key: string }: any) => void;
  router: type.Router;
  editor: type.Editor;
  auth: type.Auth;
  isUserLoggedIn: boolean;
}

function Header(props: Props) {
  const {
    resetEditor,
    openModal,
    publishEditor,
    editor,
    router,
    isUserLoggedIn,
  } = props;

  const locationPath = router.location.pathname;
  const [createDraft, { data }] = useMutation(CREATE_DRAFT);
  const handleSave = () => {
    const { title, content, author, savedOn } = editor.data;
    const toPublish = {
      title,
      content,
      author
    };

    createDraft({ variables: toPublish });
  };

  const handlePublish = () => {
    const { title, content, author, savedOn } = editor.data;
    const publishedOn = getTodayDate();
    const toPublish = {
      title,
      content,
      author,
      savedOn,
      publishedOn,
    }
    publishEditor(toPublish);

    // reset
    resetEditor();
    localStorage.clear();

    openModal();
  };

  const [readyToPublish, setReadyToPublish] = useState(false);
  const localTitle = localStorage.title;
  const localContent = localStorage.content;
  const { saved } = editor;

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
    <header
      css={locationPath === '/new-story' ? [css.header, css.headerBig] : css.header}
    >
      <h1 css={css.h1}>
        <Link to="/">BROTE</Link>
      </h1>
      {isUserLoggedIn ? <LoggedIn locationPath={locationPath} saved={saved} readyToPublish={readyToPublish} onClick={!readyToPublish ? handleSave : handlePublish} /> : <Default onClick={openModal} />}
    </header>
  )
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  router: store.router,
  auth: store.auth,
});

export default connect(mapStateToProps, actions)(Header);
