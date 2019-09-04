import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import * as type from '../../types';
// COMPONENTS
import TabMenu from '../../components/TabMenu/TabMenu';
import TabPanel from '../../components/TabMenu/TabPanel';
import Drafts from '../../components/List/Drafts';

export const GET_MY_DRAFTS = gql`
  query {
    currentUser {
      id
      name
      email
      posts {
        id
        title
        content
        savedOn
        author {
          name
        }
        isPublished
      }
    }
  }
`;

function Stories() {
  const { loading, data, error } = useQuery(GET_MY_DRAFTS);
  const [posts, setPosts] = useState<type.Posts | null>(null);

  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(!loading) {
      if (error) setPosts(null);
      if (data && data.currentUser) {
        const { posts } = data.currentUser;
        setPosts(posts);
      }
    }
  }, [loading, data, error]);

  return (
    <div>
      { loading ?
          <p>Loading...</p> :
          <React.Fragment>
            <TabMenu labels={['Drafts', 'Published']} value={value} onChange={handleChange} />
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
              <p>published</p>
            </div>
          </React.Fragment>
          // <Drafts drafts={posts} />
      }
    </div>
  );
}

export default Stories;
