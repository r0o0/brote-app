import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as type from '../../types';
// COMPONENTS
import Grid from '@material-ui/core/Grid';
import List from '../../components/List';
// CSS

export const GET_POSTS = gql`
  {
    posts {
      id,
      title,
      author,
      content,
    }
  }
`
const h2 = css`
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px solid var(--light-90);
`;

function Posts() {
  const [posts, setPosts] = useState<type.Posts | null>(null);

  // Query
  const { loading, data, error } = useQuery(GET_POSTS);

  useEffect(() => {
    if (!loading) {
      if (error) setPosts(null);
      if (data && data.posts) {
        console.log(data.posts);
        setPosts(data.posts);
      }
    }
  }, [loading, data, error]);

  return (
    <div className="container">
      <Grid
        container
        spacing={7}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={8}>
          <h2 css={h2}>Posts</h2>
          <div>
            {loading && <p>loading...</p>}
            <List posts={posts} preview={true} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <h2 css={h2}>Popular Stories</h2>
        </Grid>
      </Grid>

    </div>
  );
};

export default Posts;