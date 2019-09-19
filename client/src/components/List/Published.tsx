// List.js
import console from 'dev-console.macro';
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as type from '../../types';
import { Link } from 'react-router-dom';
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
  modal: type.Modal;
}

function Published(props: Props) {
  const {
    posts,
    handleDelete,
    openModal,
    closeModal,
    modal,
  } = props;

  const modalType = 'delete-published';
  const [toDelete, setToDelete] = useState<{id: string, title: string} | null>(null);
  const [triggerDel, setTriggerDel] = useState(false);

  const handleDeleteBtn = (id: string, title: string) => {
    setToDelete({ id, title });
    openModal({ status: true, type: modalType});
  };

  useEffect(() => {
    if (modal.type === modalType) {
      if (!modal.status) setTriggerDel(false);
      if (modal.status) setTriggerDel(true);
    }
    console.log('pudlishod', triggerDel);
  }, [modal]);

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
                    <h2 css={cssP.title}>
                      <Link to={{
                        pathname:`/p/${path}-b${id}`,
                        state: {
                          id,
                          title,
                          content,
                          author: author.name,
                          publishedOn
                        }
                      }}>
                        {title}
                      </Link>
                    </h2>
                    <p css={cssP.text} dangerouslySetInnerHTML={{__html: transformToText(content.substr(0, 100)) as string}} />
                    <span css={cssP.date}>Published on <b>{displayDate(publishedOn, false)}</b></span>
                  </div>
                  <div css={cssP.postActionsS}>
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

export default Published;
