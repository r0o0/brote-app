// List.js
import React, { useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as type from '../../types';
import { Link } from 'react-router-dom';
// COMPONENTS
import Article from '../Article';
// UTILS
import convertToPath from '../../utils/convertToPath';

interface Props {
  posts: type.Posts | null;
  preview?: boolean;
}

function List(props: Props) {
  const { preview, posts } = props;

  return (
    <React.Fragment>
      <p>list</p>
      { posts && posts.map((post: type.Post) => {
          const { id, title, content, author, publishedOn, savedOn } = post;
          const path = convertToPath(title);

          return (
            <Link
              to={{
                pathname: `/p/${path}-b${id}`,
                state: {
                  id,
                  title,
                  content,
                  author,
                  publishedOn,
                }
              }}
              key={id}
            >
              <Article title={title} content={content} author={author} savedOn={savedOn} preview={preview} />
            </Link>
          )
        })
      }
    </React.Fragment>
  );
}

export default List;
