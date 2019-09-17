import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as type from '../../types';
// COMPONENTS
import TabMenu from '../../components/TabMenu/TabMenu';
import TabPanel from '../../components/TabMenu/TabPanel';
import Drafts from '../../components/List/Drafts';
import Published from '../../components/List/Published';

export const GET_MY_POSTS = gql`
  query getMyPosts {
    posts {
      total
      drafts
      published
      data {
        id
        title
        content
        savedOn
        author {
          name
        }
        isPublished
        publishedOn
      }
    }
  }
`;

function Stories() {
  const { loading, data, error } = useQuery(GET_MY_POSTS);
  const [posts, setPosts] = useState<type.Posts | null>(null);
  const [draftsN, setDraftsN] = useState<number | string>('');
  const [publishedN, setPublishedN] = useState<number | null>(null);
  const [value, setValue] = useState(0);
  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(!loading) {
      if (error) setPosts(null);
      if (data && data.posts) {
        const { drafts, published } = data.posts;
        setPosts(data.posts.data);
        setDraftsN(drafts);
        setPublishedN(published);
      }
    }
  }, [loading, data, error]);

  return (
    <div css={css`
    `}>
      { loading ?
          <p>Loading...</p> :
          <React.Fragment>
            <TabMenu labels={[`Drafts ${draftsN}`, `Published ${publishedN}`]} value={value} onChange={handleChange} />
            <div
              role="tabpanel"
              id={`nav-tabpanel-${value}`}
              hidden={value !== 0}
            >
              <Drafts drafts={posts} />
            </div>
            <div
              role="tabpanel"
              id={`nav-tabpanel-${value}`}
              hidden={value !== 1}
            >
              <Published />
            </div>
          </React.Fragment>
      }
    </div>
  );
}

export default Stories;
