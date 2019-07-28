// List.js
import React, { useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
import { Link } from 'react-router-dom';
// COMPONENTS
import Article from '../Article';
import Grid from '@material-ui/core/Grid';
// UTILS
import convertToPath from '../../utils/convertToPath';

const h2 = css`
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid var(--light-90);
`;

interface Props {
  requestPosts: (param: string) => void;
  posts: type.Posts;
  preview?: boolean;
}

function List(props: Props) {
  const { requestPosts, posts, preview } = props;

  useEffect(() => {
    // request posts on page load
    requestPosts('posts');

  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={7}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={8}>
          <h2 css={h2}>Posts</h2>
          { posts && Object.keys(posts).map(key => {
              const { title, content, author, publishedOn, savedOn } = posts[key];
              const path = convertToPath(title);

              return (
                <Link
                  to={{
                    pathname: `/p/${path}-b${key}`,
                    state: {
                      id: key,
                      title,
                      content,
                      author,
                      publishedOn,
                    }
                  }}
                  key={key}
                >
                  <Article title={title} content={content} author={author} savedOn={savedOn} preview={preview} />
                </Link>
              )
            })
          }
        </Grid>
        <Grid item xs={12} sm={4}>
          <h2 css={h2}>Popular Stories</h2>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (store: any) => ({
  posts: store.requests.data,
});

export default connect(mapStateToProps, actions)(List);
