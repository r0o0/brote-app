import React from 'react';
import { connect } from 'react-redux';
import * as type from '../../types';
// UTILS
import { getCleaned } from '../../utils/sanitizeHTML';

interface Props {
  title: string;
  content: string;
}

function Article(props: Props) {
  const { title, content } = props;
  const cleanContent = getCleaned(content);
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: cleanContent}}></div>
    </div>
  );
}

export default Article;
