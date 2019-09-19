import console from 'dev-console.macro';
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
// CSS
import * as css from './ArticleStyles';
// UTILS
import { getCleaned } from '../../utils/sanitizeHTML';
import { transformToText } from '../../utils/HTMLparser';
import { displayDate } from '../../utils/date';
import UserProfile from '../User/UserProfile';

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
      const formatted = displayDate(savedOn);
      date = formatted;
    }
  } else {
    cleanContent = getCleaned(content);
    if (publishedOn !== undefined) {
      const formatted = displayDate(publishedOn);
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
              <div css={{
                width: '40px',
                height: '40px',
                marginRight: '10px',
              }}>
                <UserProfile user={author} />
              </div>
              <div className="info-detail">
                <span className="author">{author === undefined || author === null ? "Brote Bot" : author}</span>
                <span>{date}</span>
              </div>
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
