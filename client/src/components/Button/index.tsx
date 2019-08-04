import React from 'react';
/** @jsx jsx */
import { jsx, css, InterpolationWithTheme } from '@emotion/core';

interface Props {
  classname?: string,
  value: string,
  onClick?: () => void;
  cssE?: InterpolationWithTheme<any>;
}

function Button(props: Props) {
  const {
    classname,
    value,
    onClick,
    cssE,
  } = props;
  console.log({...props});
  return (
    <button
      className={classname}
      css={cssE}
      type="button"
      onClick={onClick}
      {...props}
    >
      {value}
    </button>
  )
}

export default Button;

