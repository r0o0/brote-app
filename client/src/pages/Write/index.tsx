// Write.js
import React, { useEffect, useState, useRef } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENT
import RichEditor from '../../components/RichEditor';
import Preview from '../../components/Preview';
// CSS
import '../../globalStyle';
import * as css from './WriteStyles';

interface Props {
  writingContent: ({ title: string} : any) => void;
}

function Write(props: Props) {
  // PROPS
  const { writingContent } = props;

  // STATE
  const [inputValue, setInputValue] = useState('');

  // METHODS
  const handleTitleChange = (e: any) => {
    localStorage.setItem('title', e.target.value);
    setInputValue(e.target.value);
    writingContent({ title: e.target.value })
  };

  // HOOKS
  useEffect(() => {
    const newValue = localStorage.getItem('title');
    if (newValue !== null) {
      setInputValue(newValue);
    }
  }, [inputValue, document.activeElement]);

  return (
    <div
      className="container"
      css={css.wrapper}
    >
      <input
        css={css.inputTitle}
        type="text"
        placeholder="Title"
        onChange={(e) => handleTitleChange(e)}
        value={inputValue}
        autoComplete="off"
      />
      <RichEditor />
      <Preview />
    </div>
  )
}

export default connect(null, actions)(Write);
