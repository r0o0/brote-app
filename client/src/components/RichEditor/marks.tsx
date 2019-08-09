import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { RenderMarkProps } from 'slate-react';

export const renderMark = (props: RenderMarkProps, editor: any, next: Function) => {
  const { children, mark, attributes } = props;

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>;
    case 'italic':
      return <em {...attributes}>{children}</em>;
    case 'underlined':
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
};