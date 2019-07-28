import React, { useEffect } from 'react';
// COMPONENTS
import Article from '../../components/Article';
// CSS
import '../../globalStyle';

interface Props {
  location: any;
}

function Post(props: Props) {
  const state = props.location.state;
  const { title, content, author, publishedOn } = state;

  return (
    <div className="container">
      <Article title={title} content={content} author={author} publishedOn={publishedOn} />
    </div>
  )
}

export default Post;
