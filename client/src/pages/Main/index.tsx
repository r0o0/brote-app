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

function Main(props: any) {
  const { setLocation } = props;
  const handleClick = () => {
    setLocation({ path: "/new-story", name: "write"})
  };
  console.log(props);
  return (
    <div css={container}>
      <Link to="/new-story" css={button} onClick={handleClick}>Write New Story</Link>
    </div>
  )
}

export default connect(null, actions)(Main);
