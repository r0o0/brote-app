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
const inputTitle = css`
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  padding: 0 16px;
  border: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 28px;
  color: var(--text);
  &::placeholder {
    opacity: 0.33;
  }
  &:focus {
    outline: none;
  }
  label: input--title;
`;

function Write(props: any) {
  console.log('Write PROPS', props);
  
  return (
    <div
      css={container}
    >
      <input
        css={inputTitle}
        type="text"
        placeholder="Title"
        autoComplete="off"
      />
      <RichEditor />
    </div>
  )
}

export default Write;
