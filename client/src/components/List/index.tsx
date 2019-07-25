// List.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENTS
import Item from './Item';

interface Props {
  requestPosts: (param: string) => void;
}

function List(props: Props) {
  const { requestPosts } = props;

  useEffect(() => {
    // request posts on page load
    requestPosts('posts');

  }, []);

  return (
    <React.Fragment>
      <h1>Posts</h1>
      <div>
        <Item />
      </div>
    </React.Fragment>
  );
}

export default connect(null, actions)(List);
