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
// UTILS
import convertToPath from '../../utils/convertToPath';
import { displayDate } from '../../utils/date';
import { getCleaned } from '../../utils/sanitizeHTML';
import { transformToText } from '../../utils/HTMLparser';
import { postsRequest } from '../../redux/reducers/RequestReducer';

interface Props {
  drafts: type.Posts | null;
  preview?: boolean;
  // author?: string | null;
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

function List(props: Props) {
  const { preview, drafts } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPublished, setIsPublished] = useState<boolean | null>(null);
  console.log('posts', drafts);

  const [publishPost] = useMutation(PUBLISH_POST);
  // useEffect(() => {
  //   if (drafts) setIsPublished(drafts.isPublished);
  // }, [drafts]);
  const handleClose = () => setAnchorEl(null);
  const handlePublish = (id: string, title: string) => {
    console.log('publish', id, title)
    alert(`${title} is published :)`);
    publishPost({ variables: { id } });
  };
  return (
    <div css={css`
      padding-top: 32px;
    `}>
      { drafts && drafts.map((post: type.Post) => {
        const { id, title, content, publishedOn, savedOn, author } = post;
        const path = convertToPath(title);
          console.log('posts', post);
          return (
            <React.Fragment key={id}>
              { !post.isPublished ?
                <div>
                  <h2>{title}</h2>
                  <p dangerouslySetInnerHTML={{__html: transformToText(content.substr(0, 100)) as string}} />
                  <span>Last edited {displayDate(savedOn ? savedOn : '', false)}</span>
                  <IconButton onClick={(e) => console.log(id, title)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <Link to={{
                    pathname: `/p/${path}-b${id}`,
                    state: {
                      id,
                      title,
                      content,
                      author: author.name,
                      publishedOn
                    }
                  }}>
                    <Button
                      onClick={() => handlePublish(id, title)}
                      value="Publish"
                    />
                  </Link>

                </div> :
                null
              }
            </React.Fragment>
          );
        })
      }
    </div>
  );
}

export default List;
