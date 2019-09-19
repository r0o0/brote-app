// List.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as type from '../../types';
import { Link } from 'react-router-dom';
// GraphQL
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '../../components/Button';
import CheckDelete from './CheckDelete';
// UTILS
import convertToPath from '../../utils/convertToPath';
import { displayDate } from '../../utils/date';
import { getCleaned } from '../../utils/sanitizeHTML';
import { transformToText } from '../../utils/HTMLparser';
// CSS
import * as cssB from '../../components/Button/ButtonStyles';
import * as cssP from './ListStyles';

interface Props {
  posts: type.Posts | null;
  handleDelete: (toDelete: {id: string, title: string} | null) => void;
  openModal: ({}: {status: boolean, type: string}) => void;
  closeModal: () => void;
  modal: type.Modal;
}

const PUBLISH_POST = gql`
  mutation PublishPost($id: ID!) {
    publish(id: $id) {
      id
      isPublished
      publishedOn
    }
  }
`;

function Drafts(props: Props) {
  const {
    posts,
    handleDelete,
    openModal,
    closeModal,
    modal,
  } = props;

  const modalType = 'delete-draft';
  const [toDelete, setToDelete] = useState<{id: string, title: string} | null>(null);
  const [triggerDel, setTriggerDel] = useState(false);

  const [publishPost] = useMutation(PUBLISH_POST);

  const handleDeleteBtn = (id: string, title: string) => {
    setToDelete({ id, title });
    openModal({ status: true, type: modalType});
  };

  const handlePublish = (id: string, title: string) => {
    alert(`${title} is published :)`);
    publishPost({ variables: { id } });
  };

  useEffect(() => {
    if (modal.type === modalType) {
      if (!modal.status) setTriggerDel(false);
      if (modal.status) setTriggerDel(true);
    }
    console.log('drafts', triggerDel);
  }, [modal]);

  return (
    <div css={css`
      padding-top: 32px;
    `}>
      { posts && posts.map((post: type.Post) => {
        const { id, title, content, savedOn, author } = post;
        const path = convertToPath(title);
        const cleanContent = transformToText(content.substr(0, 100));
          return (
            <React.Fragment key={id}>
              { !post.isPublished ?
                <div css={cssP.wrapper}>
                  <div css={cssP.postContent}>
                    <h2 css={cssP.title}>{title}</h2>
                    <p css={cssP.text} dangerouslySetInnerHTML={{__html: cleanContent ? cleanContent : ''}} />
                    <span css={cssP.date}>Last edited <b>{displayDate(savedOn ? savedOn : '', false)}</b></span>
                  </div>
                  <div css={cssP.postActions}>
                    <Link to={{
                        pathname: `/edit-story/${path}-b${id}`,
                        state: {
                          id,
                          title,
                          content,
                          author: author.name,
                          savedOn,
                        }
                      }}
                      css={cssP.btnEdit}
                    >
                      <IconButton onClick={(e) => console.log(id, title)}>
                        <Icon>edit</Icon>
                      </IconButton>
                    </Link>
                    <div css={cssP.btnWrapper}>
                      <Link to={{
                        pathname: `/p/${path}-b${id}`,
                        state: {
                          id,
                          title,
                          content,
                          author: author.name,
                          savedOn,
                        }
                      }}>
                        <Button
                          css={[cssB.btnDefault, cssP.btnPublish]}
                          onClick={() => handlePublish(id, title)}
                          value="Publish"
                        />
                      </Link>
                      <Button
                        css={[cssB.btnDefault, cssP.btnDel]}
                        onClick={() => handleDeleteBtn(id, title)}
                        value="Delete"
                      />
                    </div>
                  </div>

                </div> :
                null
              }
            </React.Fragment>
          );
        })
      }
      { triggerDel ?
          <CheckDelete
            handleDelete={handleDelete}
            toDelete={toDelete}
            closeModal={closeModal}
          /> : null
      }
    </div>
  );
}

export default Drafts;
