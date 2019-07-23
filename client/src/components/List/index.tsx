// List.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// import * as api from '../../utils/api';

function List(props: any) {
  const { requestPosts } = props;
  useEffect(() => {
    requestPosts('posts');

  }, [])
  return (
    <React.Fragment>
      <h1>Posts</h1>
      <ul>
        <li></li>
      </ul>
    </React.Fragment>
  );
}

export default connect(null, actions)(List);
