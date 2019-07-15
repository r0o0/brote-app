// Header.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

const header = css`
  padding: 16px;
  &:hover {
    color: blue;
  };
  label: global-header;
`;

function Header() {
  return (
    <header css={header}>
      <h1>
        <Link to="/">BROTE</Link>
      </h1>
    </header>
  )
}

export default Header;
