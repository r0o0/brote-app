// List.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// COMPONENTS
import Article from '../Article';
import Grid from '@material-ui/core/Grid';

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
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={8}>
          <h2>Posts</h2>
          { posts && Object.keys(posts).map(key => {
              const title = posts[key].data.title;
              const content = posts[key].data.text;
              return <Article key={key} title={title} content={content} preview={preview} />
            })
          }
        </Grid>
        <Grid item xs={12} sm={4}>
          <h2>Popular Stories</h2>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (store: any) => ({
  posts: store.requests.data,
});

export default connect(mapStateToProps, actions)(List);
