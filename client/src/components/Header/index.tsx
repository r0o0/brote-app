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
  justify-content: space-between;
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

const button = css`
  width: fit-content;
  padding: 12px 16px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  font-size: 14px;
  color: var(--primary);
  label: btn--publish;
`;

function Header(props: any) {
  const { setLocation, location } = props;

  const handleClick = () => {
    setLocation({ path: "/", name: "home"});
  };

  return (
    <header css={header}>
      <h1 css={h1}>
        <Link to="/" onClick={handleClick}>BROTE</Link>
      </h1>
      {location.name === 'write' ? <button css={button}>Publish</button> : null}
    </header>
  )
}

const mapStateToProps = (store: any) => ({
  count: store.count,
  location: store.location,
});

export default connect(mapStateToProps, actions)(Header);
