// Write.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
// COMPONENT
import RichEditor from '../../components/RichEditor';

const container = css`
  padding: 16px;
  label: container;
`;

function Write() {
  return (
    <div
      css={container}
    >
      <RichEditor />
    </div>
  )
}

export default Write;
