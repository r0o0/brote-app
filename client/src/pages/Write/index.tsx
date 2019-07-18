// Write.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENT
import RichEditor from '../../components/RichEditor';

const container = css`
  padding: 16px 16px 0;
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

function Write() {
  return (
    <div
      css={container}
    >
      <input
        css={inputTitle}
        type="text"
        placeholder="Title"
        onChange={() => console.log('title change')}
        autoComplete="off"
      />
      <RichEditor />
    </div>
  )
}

export default connect(null, actions)(Write);
