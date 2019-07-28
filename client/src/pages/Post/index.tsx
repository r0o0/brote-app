import React from 'react';
import { connect } from 'react-redux';

function Post() {
  return (
    <div>
      Post
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  posts: store.requests.posts,
});

export default connect(mapStateToProps)(Post);
