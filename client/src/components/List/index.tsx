// List.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// COMPONENTS
import Article from '../Article';

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
      <h1>Posts</h1>
      <div>
        { posts && Object.keys(posts).map(key => {
            const title = posts[key].data.title;
            const content = posts[key].data.text;
            return <Article title={title} content={content} preview={preview} />
          })
        }
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (store: any) => ({
  posts: store.requests.data,
});

export default connect(mapStateToProps, actions)(List);
