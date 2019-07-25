// List.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// COMPONENTS
import Item from './Item';
import Article from '../Article';
// UTILS
import { getCleaned } from '../../utils/sanitizeHTML';

interface Props {
  requestPosts: (param: string) => void;
  posts: type.Posts;
}

function List(props: Props) {
  const { requestPosts, posts } = props;

  useEffect(() => {
    // request posts on page load
    requestPosts('posts');

  }, []);

  return (
    <React.Fragment>
      <h1>Posts</h1>
      <div>
        {/* <Item /> */}
        { posts && Object.keys(posts).map(key => {
            const title = posts[key].data.title;
            const content = posts[key].data.text;
            return <Article title={title} content={content} />
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
