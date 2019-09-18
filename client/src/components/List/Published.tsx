// List.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as type from '../../types';
// COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '../../components/Button';
import CheckDelete from './CheckDelete';
// CSS
import * as cssB from '../Button/ButtonStyles';
import * as cssP from './ListStyles';
// UTILS
import convertToPath from '../../utils/convertToPath';
import { displayDate } from '../../utils/date';
import { transformToText } from '../../utils/HTMLparser';

interface Props {
  posts: type.Posts | null;
  handleDelete: (toDelete: {id: string, title: string} | null) => void;
  openModal: ({}: {status: boolean, type: string}) => void;
  closeModal: () => void;
}

function Published(props: Props) {
  const {
    posts,
    handleDelete,
    openModal,
    closeModal,
  } = props;

  const [toDelete, setToDelete] = useState<{id: string, title: string} | null>(null);

  const handleDeleteBtn = (id: string, title: string) => {
    setToDelete({ id, title });
    openModal({ status: true, type: 'check-delete'});
  };

  return (
    <div css={css`
      padding-top: 32px;
    `}>
      { posts && posts.map((post: type.Post) => {
        const { id, title, content, publishedOn, author } = post;
        const path = convertToPath(title);
          return (
            <React.Fragment key={id}>
              { post.isPublished ?
                <div css={cssP.wrapper}>
                  <div css={cssP.postContent}>
                    <h2 css={cssP.title}>{title}</h2>
                    <p css={cssP.text} dangerouslySetInnerHTML={{__html: transformToText(content.substr(0, 100)) as string}} />
                    <span css={cssP.date}>Published on <b>{displayDate(publishedOn ? publishedOn : '', false)}</b></span>
                  </div>
                  <div css={cssP.postActions}>
                    <IconButton css={cssP.btnEdit} onClick={(e) => console.log(id, title)}>
                      <Icon>edit</Icon>
                    </IconButton>
                    <div css={cssP.btnWrapper}>
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
      <CheckDelete handleDelete={handleDelete} toDelete={toDelete} closeModal={closeModal} />
    </div>
  );
}

export default Published;
