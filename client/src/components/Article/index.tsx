import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { previewArticle, previewTitle, previewP } from './ArticleStyles';
// UTILS
import { getCleaned } from '../../utils/sanitizeHTML';
import { transformToText } from '../../utils/HTMLparser';

interface Props {
  title: string;
  content: string;
  preview?: boolean;
}

function Article(props: Props) {
  const { title, content, preview } = props;
  let cleanContent;
  if (preview) {
    const readyToParse = content.substr(0, 150);
    cleanContent = transformToText(readyToParse) as string;
  } else {
    cleanContent = getCleaned(content);
  }

  return (
    <div css={previewArticle}>
      <h1 css={previewTitle}>{title}</h1>
      {preview ?
        <p css={previewP} dangerouslySetInnerHTML={{__html: cleanContent}}></p> :
        <div dangerouslySetInnerHTML={{__html: cleanContent}}></div>
      }
    </div>
  );
}

export default Article;