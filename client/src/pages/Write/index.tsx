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
  // console.log('%c refresh', 'background: green;',  performance.navigation, '\n', performance.getEntriesByType('navigation'), '\n', document.cookie);
  //check for Navigation Timing API support
  // if (window.performance) {
  //   console.info("window.performance works fine on this browser");
  // }
  //   if (performance.navigation.type == 1) {
  //     console.info( "This page is reloaded" );
  //   } else {
  //     console.info( "This page is not reloaded");
  //   }
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
