// Main.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
// CSS
import '../../colors.css';

const container = css`
  padding: 16px;
  label: container;
`;

const button = css`
  padding: 10px 12px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  font-size: 14px;
  color: var(--primary);
  label: btn--write;
`;

function Main() {
  return (
    <div css={container}>
      <Link to="/new-story" css={button}>Write New Story</Link>
    </div>
  )
}

export default Main;
