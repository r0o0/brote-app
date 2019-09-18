import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
// CSS
import * as css from './ArticleStyles';
// UTILS
import { getCleaned } from '../../utils/sanitizeHTML';
import { transformToText } from '../../utils/HTMLparser';
import { formatDate } from '../../utils/date';

interface Props {
  title: string;
  content: string;
  author: string;
  publishedOn?: string;
  savedOn?: string;
  preview?: boolean;
}

function Article(props: Props) {
  const { title, content, author, publishedOn, savedOn, preview } = props;
  let cleanContent: string;
  let date: string;
  console.log('post', props);
  if (preview) {
    const readyToParse = content.substr(0, 300);
    cleanContent = transformToText(readyToParse) as string;
    console.log('eeeee', savedOn);
    if (savedOn !== undefined && savedOn !== null) {
      const formatted = formatDate(savedOn);
      date = formatted;
    }
  } else {
    cleanContent = getCleaned(content);
    if (publishedOn !== undefined) {
      const formatted = formatDate(publishedOn);
      date = formatted;
    }
  }

  const renderPreview = () => {
    return (
      <div css={css.previewArticle}>
        <h1 css={css.previewTitle}>{title}</h1>
        <div className="preview-info" css={css.info}>
          <span className="info--author">{author}</span>
          <span>{date}</span>
        </div>
        <p css={css.previewP} dangerouslySetInnerHTML={{__html: cleanContent}}></p>
      </div>
    );
  };

  const renderPost = () => {
    return (
      <div>
          <div css={css.header}>
            <h1 css={css.title}>{title}</h1>
            <div css={css.info}>
              <a className="info--author" href="">{author === undefined || author === null ? "Brote Bot" : author}</a>
              <span>{date}</span>
            </div>
          </div>
          <div css={css.content} dangerouslySetInnerHTML={{__html: cleanContent}}></div>
        </div>
    );
  }

  return (
    <React.Fragment>
      {preview ? renderPreview() : renderPost()}
    </React.Fragment>
  );
}

export default Article;
