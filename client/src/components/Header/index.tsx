// Header.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
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


function Header(props: any) {
  const { setLocation, location, editor } = props;

  const handleClick = (e: React.MouseEvent) => {
    setLocation({ path: "/", name: "home"});
  };

  const renderEditorHeader = () => {
    return (
      <div>
        <span css={span}>{!editor.saved ? 'Writing...' : 'Saved'}</span>
        <button css={button}>Publish</button>
      </div>
    );
  };

  return (
    <header css={header}>
      <h1 css={h1}>
        <Link to="/" onClick={handleClick}>BROTE</Link>
      </h1>
      {location.name === 'write' ? renderEditorHeader() : null}
    </header>
  )
}

const mapStateToProps = (store: any) => ({
  editor: store.editor,
  location: store.location,
});

export default connect(mapStateToProps, actions)(Header);
