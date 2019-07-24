// Header.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import * as type from '../../types';
// UTILS
import { editorValidator } from '../../utils/editor';
// CSS
import '../../colors.css';

const header = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  transition: padding-top 0.34s cubic-bezier(0.13, 0.59, 0.8, 1.04);
  @media(min-width: 720px) {
    padding: 16px 40px;
  }
  @media(min-width: 1440px) {
    padding: 16px 80px;
  }
  label: global-header;
`;

const headerBig = css`
  padding: 20px 16px;
  transition: padding-top 0.34s cubic-bezier(0.57, 0.38, 0.37, 0.63);
  @media(min-width: 720px) {
    padding: 24px 40px;
  }
  @media(min-width: 1440px) {
    padding: 24px 80px;
  }
  label: header-big;
`;

const h1 = css`
  font-size: 24px;
  &:hover {
    color: var(--primary);
  }
  label: logo;
`;

const span = css`
  margin-right: 12px;
  font-weight: bold;
  font-size: 14px;
  color: var(--light-md);
`;

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

interface Props {
  resetEditor: () => void;
  publishEditor: ({ key: string }: any) => void;
  setLocation: ({ key: string }: any) => void;
  location: type.Location,
  editor: type.Editor,
}

function Header(props: Props) {
  const {
    resetEditor,
    setLocation,
    // location,
    publishEditor,
    editor
  } = props;

  // location path state,
  const path = window.location.pathname;
  const [locationPath, setLocationPath] = useState(path);
  console.log('data editor', editor.data);
  const handleClick = (e: React.MouseEvent) => {
    setLocation({ path: "/", name: "home"});
  };

  const handlePublish = () => {
    const { title, text } = editor.data;
    console.log('%c handlePublish', 'background: white; color: green;',
    editor.data
    );
    publishEditor({ title, text });
    resetEditor();
    localStorage.clear();
    setLocation({ path: "/", name: "home"});
  };

  useEffect(() => {
    setLocationPath(path);
  }, [path]);

  const renderEditorHeader = () => {
    const { saved, valid } = editor;
    const localTitle = localStorage.title;
    const localText = localStorage.content;

    const goodToPublish = () => {
      if (valid === null) {
        console.log('not Valid');
        const isValid = editorValidator(localTitle, localText);
        if (isValid) {
          console.log('%c GOOD TO PUBLISH!!!! ', 'background: white; color: green;');
          return <Link to="/posts" css={button} onClick={handlePublish}>Publish</Link>;
        }
      } else {
        if (valid) {
          console.log('%c GOOD TO PUBLISH!!!! ', 'background: white; color: green;');
          return <Link to="/posts" css={button} onClick={handlePublish}>Publish</Link>;
        }
      }
      return <button css={button}>Save Draft</button>;
    };
    return (
      <div>
        {saved !== null ? <span css={span}>{!saved ? 'Writing...' : 'Saved'}</span> : null}
        {goodToPublish()}
      </div>
    );
  };

  return (
    <header
      css={locationPath === '/new-story' ? [header, headerBig] : header}
    >
      <h1 css={h1}>
        <Link to="/" onClick={handleClick}>BROTE</Link>
      </h1>
      {locationPath === '/new-story' ? renderEditorHeader() : null}
    </header>
  )
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  location: store.location,
});

export default connect(mapStateToProps, actions)(Header);
