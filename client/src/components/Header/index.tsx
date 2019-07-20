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
  padding: 16px;
  label: global-header;
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
  padding: 4px 16px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  font-size: 14px;
  color: var(--primary);
  label: btn--publish;
`;

interface Props {
  resetEditor: () => void;
  setLocation: ({ key: string }: any) => void;
  location: type.Location,
  editor: type.Editor,
}


function Header(props: Props) {
  const {
    resetEditor,
    setLocation,
    // location,
    editor
  } = props;

  // location path state,
  const path = window.location.pathname;
  const [locationPath, setLocationPath] = useState(path);

  const handleClick = (e: React.MouseEvent) => {
    setLocation({ path: "/", name: "home"});
  };

  const handlePublish = () => {
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
    // console.log(
    //   '%c valid props', '\n',
    //   'background: green; color: white;',
    //   'editor:', title, text, '\n',
    //   'valid:', valid, '\n',
    //   'local:', localTitle, localText,

    // );

    const goodToPublish = () => {
      if (valid === null) {
        const isValid = editorValidator(localTitle, localText);
        console.log('publish?:', isValid);
        if (isValid) {
          console.log('GOOD TO PUBLISH!!!!');
          return <Link to="/" css={button} onClick={handlePublish}>Publish</Link>;
        }
      } else {
        if (valid) {
          console.log('GOOD TO PUBLISH!!!!');
          return <Link to="/" css={button} onClick={handlePublish}>Publish</Link>;
        }
      }
      return <button css={button}>Save Draft</button>;
    };
    return (
      <div>
        {saved !== null ? <span css={span}>{!saved ? 'Writing...' : 'Saved'}</span> : null}
        {goodToPublish()}
        {/* {valid ? <Link to="/" css={button} onClick={handlePublish}>Publish</Link> : <button css={button}>Save Draft</button>} */}
      </div>
    );
  };

  return (
    <header css={header}>
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
