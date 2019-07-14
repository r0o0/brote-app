// Header.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const header = css`
  padding: 16px;
  label: global-header;
`;

function Header() {
  return (
    <header css={header}>
      <h1>BROTE</h1>
    </header>
  )
}

export default Header;
