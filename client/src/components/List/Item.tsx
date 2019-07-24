import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';

interface Props {
  posts: type.Posts;
}

function Article(props: Props) {
  const { posts } = props;

  useEffect(() => {
    console.log('posts', posts);
  }, [posts]);

  return (
    <React.Fragment>
      { posts && Object.keys(posts).map(key => {
        const title = posts[key].data.title;
        return (
        <li key={key}>
          <h1>{title}</h1>
        </li>
        );
      })

      }
    </React.Fragment>
  );
}

const mapStateToProps = (store: any) => ({
  posts: store.requests.data,
});

export default connect(mapStateToProps)(Article);
