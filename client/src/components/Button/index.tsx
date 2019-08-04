import React from 'react';
/** @jsx jsx */
import { jsx, css, InterpolationWithTheme } from '@emotion/core';

interface Props {
  classname?: string,
  value: string,
  onClick?: () => void;
  cssemotion?: InterpolationWithTheme<any>;
}

function Button(props: Props) {
  const {
    classname,
    value,
    onClick,
    cssemotion,
  } = props;

  return (
    <button
      className={classname}
      css={cssemotion}
      type="button"
      onClick={onClick}
      {...props}
    >
      {value}
    </button>
  )
}

export default Button;

