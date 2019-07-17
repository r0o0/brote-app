// Main.js
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// CSS
import '../../colors.css';

const container = css`
  padding: 16px;
  min-height: 100vh;
  label: container;
`;

const button = css`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 12px;
  border: 1px solid var(--primary);
  border-radius: 5px;
  font-size: 14px;
  color: var(--primary);
  label: btn--write;
`;

function Main(props: any) {
  const { setLocation } = props;
  const handleClick = () => {
    setLocation({ path: "/new-story", name: "write"});
  };
  return (
    <div css={container}>
      <h1>Home</h1>
      <Link to="/new-story" css={button} onClick={handleClick}>Write New Story</Link>
    </div>
  )
}

export default connect(null, actions)(Main);
