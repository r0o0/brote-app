import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
// COMPONENTS
import TabMenu from '../../components/TabMenu/TabMenu';
// import TabPanel from '../../components/TabMenu/TabPanel';
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

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    delete(id: $id) {
      id
    }
  }
`;

interface Props {
  openModal: ({}: {status: boolean, type: string}) => void;
  closeModal: () => void;
  modal: type.Modal;
}

function Stories(props: Props) {
  const { openModal, closeModal, modal } = props;
  const { loading, data, error } = useQuery(GET_MY_POSTS);
  const [posts, setPosts] = useState<type.Posts | null>(null);
  const [draftsN, setDraftsN] = useState<number | string>('');
  const [publishedN, setPublishedN] = useState<number | null>(null);
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [deletePost] = useMutation(DELETE_POST);

  const handleDelete = (toDelete: { id: string, title: string } | null) => {
    if (!toDelete) return;
    if (toDelete) deletePost({
      variables: { id: toDelete.id },
      refetchQueries: [{ query: GET_MY_POSTS }],
    });
  };

  useEffect(() => {
    if(!loading) {
      if (error) setPosts(null);
      if (data && data.posts) {
        // console.log(data);
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
              <Drafts
                posts={posts}
                handleDelete={handleDelete}
                openModal={openModal}
                closeModal={closeModal}
                modal={modal}
              />
            </div>
            <div
              role="tabpanel"
              id={`nav-tabpanel-${value}`}
              hidden={value !== 1}
            >
              <Published
                posts={posts}
                handleDelete={handleDelete}
                openModal={openModal}
                closeModal={closeModal}
                modal={modal}
              />
            </div>
          </React.Fragment>
      }
    </div>
  );
}

const mapStateToProps = ({ modal }: type.ModalState) => ({ modal });

export default connect(mapStateToProps, actions)(Stories);
