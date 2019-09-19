// List.js
import console from 'dev-console.macro';
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
  // author?: string | null;
}

function List(props: Props) {
  const { preview, posts } = props;
  console.log('posts', posts);
  return (
    <React.Fragment>
      {/* <p>list</p> */}
      { posts && posts.map((post: type.Post) => {
          const { id, title, content, publishedOn, savedOn, author } = post;
          const path = convertToPath(title);
          console.log('posts', post);
          return (
            <Link
              to={{
                pathname: `/p/${path}-b${id}`,
                state: {
                  id,
                  title,
                  content,
                  author: author.name,
                  publishedOn,
                }
              }}
              key={id}
            >
              <Article title={title} content={content} author={author.name} savedOn={savedOn} preview={preview} />
            </Link>
          )
        })
      }
    </React.Fragment>
  );
}

export default List;
