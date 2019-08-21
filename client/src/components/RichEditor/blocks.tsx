import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Block } from 'slate';
import { RenderBlockProps } from 'slate-react';

const codeblock = css`
  white-space: pre-wrap;
  // margin: 0 40px;
  padding: 16px 20px;
  background: var(--light-90);
  label: Editor-codeblock;
`;

const blockquote = css`
  border-left: 3px solid var(--light-md);
  // margin: 0 24px;
  padding: 6px 0;
  padding-left: 20px;
  span {
    word-break: break-all;
    color: var(--light-md);
  }
  label: Editor-blockquote;
`;

const image = (orientation: string) => css`
  margin: 0 auto;
  width: 100%;
  max-width: ${orientation === 'landscape' ? '600px' : '320px'};
  height: auto;
  margin-left: 50%;
  transform: translateX(-50%);
  label: Editor-image;
`;

export const renderBlock = (props: RenderBlockProps, editor: any, next: Function) => {
  const {
    attributes,
    children,
    node
  } = props as RenderBlockProps;

  switch ((node as Block).type) {
    case 'block-quote':
      return <blockquote css={blockquote} {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'code':
      return (
        <pre css={codeblock} {...attributes}>
          <code>{children}</code>
        </pre>
      );
    case 'image':
      const data = (node as Block).data;
      const src = data.get('src');
      const id = data.get('data-image-id');
      const orientation = data.get('data-image-orientation');
      return src ?
        <img
          css={image(orientation)}
          src={src}
          data-image-id={id}
          data-imgae-orientation={orientation}
        />
      : null;
    default:
      return next();
  }
};
