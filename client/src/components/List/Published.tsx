// List.js
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as type from '../../types';
// GraphQL
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_MY_POSTS } from '../../pages/User/Stories';
// COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '../../components/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
// CSS
import * as cssB from '../Button/ButtonStyles';
import * as cssP from './ListStyles';
// UTILS
import convertToPath from '../../utils/convertToPath';
import { displayDate } from '../../utils/date';
import { transformToText } from '../../utils/HTMLparser';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    delete(id: $id) {
      id
    }
  }
`;

function Published() {
  const [posts, setPosts] = useState<type.Posts | null>(null);
  const {loading, data, error} = useQuery(GET_MY_POSTS);
  console.log('posts', posts);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<{id: string, title: string} | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [deleteAction, setDeleteAction] = useState<boolean>(false);
  const [cancelDelete, setCancelDelete] = useState<boolean>(true);
  const [deletePost] = useMutation(DELETE_POST);
  const handleDelete = (id: string, title: string) => {
    setToDelete({ id, title });
    setOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleDeleteBtn = () => {
    if (!cancelDelete) {
      setDeleteAction(true);
      if (toDelete) deletePost({
        variables: { id: toDelete.id },
        refetchQueries: [{ query: GET_MY_POSTS }],
      });
    }
  };

  // load post data
  useEffect(() => {
    if (!loading) {
      if (data && data.posts) {
        setPosts(data.posts.data);
      }
    }
  }, [loading, data, error]);

  // reset input value in dialog: delete post
  useEffect(() => {
    if (open) {
      setInputValue('');
    }
  }, [open]);

  // check to delete title and input value is same
  useEffect(() => {
    if (toDelete) {
      if (inputValue.length !== 0) {
        if (inputValue === toDelete.title) setCancelDelete(false);
        if (inputValue !== toDelete.title) setCancelDelete(true);
      }
    }
  }, [inputValue]);

  // close dialog: delete post and reset
  useEffect(() => {
    if (deleteAction && !cancelDelete) {
      setOpen(false);
      setCancelDelete(true);
    }
  }, [deleteAction, cancelDelete]);

  return (
    <div css={css`
      padding-top: 32px;
    `}>
      { posts && posts.map((post: type.Post) => {
        const { id, title, content, publishedOn, author } = post;
        const path = convertToPath(title);
          console.log('posts', post);
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
                    <Button
                      css={[cssB.btnDefault, cssP.btnDel]}
                      onClick={() => handleDelete(id, title)}
                      value="Delete"
                    />
                  </div>
                </div> :
                null
              }
            </React.Fragment>
          );
        })
      }
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-post-delete"
      >
        <DialogTitle id="dialog-post-delete">Are you sure you want to delete your story?</DialogTitle>
        <DialogContent>
          <p css={css`line-height: 1.25em;`}>
            This action cannot be undone. This will permanently delete your story <strong css={css`color: var(--primary);`}>{toDelete && toDelete.title}</strong>
            <span css={css`
              margin: 20px 0 5px;
              display: block;
            `}>
              Please type in the name of the repository to confirm.
            </span>
          </p>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            // label="Title to delete"
            type="text"
            onChange={handleChange}
            value={inputValue}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            value="Delete"
            css={cancelDelete ? [cssB.btnDefault, cssB.btnDisabledState] : [cssB.btnDefault, cssB.btnDelete]}
            onClick={handleDeleteBtn}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Published;
