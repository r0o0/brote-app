import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
import sanitizeHtml from 'sanitize-html';

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
          const content = posts[key].data.text;
          const cleanContent = sanitizeHtml(content, {
            allowedTags: ['h1', 'h2', 'p', 'em', 'strong', 'li', 'ol', 'code'],
          });
          return (
            <article key={key}>
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{__html: cleanContent}}>
              </div>
            </article>
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
