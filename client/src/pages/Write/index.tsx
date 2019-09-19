// Write.js
import React, { useEffect, useState, useRef } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../redux/actions';
// COMPONENT
import RichEditor from '../../components/RichEditor';
import Preview from '../../components/Preview';
// CSS
import '../../globalStyle';
import * as css from './WriteStyles';

interface Props extends RouteComponentProps {
  writingContent: ({ title: string} : any) => void;
}

function Write(props: Props) {
  // PROPS
  const { writingContent, location } = props;

  // STATE
  const { state } = location;
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<string | null>(null);

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

  useEffect(() => {
    if (state === undefined) return;
    if (state) {
      console.log('location state', state);
      setEditMode(true);
      setContent(state.content);
      const { title, content } = state;
      setInputValue(title);
      localStorage.setItem('title', title);
      localStorage.setItem('content', content);
    }
    return () => {
      setInputValue('');
      setEditMode(false);
    }
  }, [location]);

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
      {console.log('ttttt', editMode, content)}
      { editMode && <RichEditor editContent={content} /> }
      { !editMode && <RichEditor /> }
      {/* <RichEditor /> */}
      <Preview />
    </div>
  )
}

export default connect(null, actions)(Write);
