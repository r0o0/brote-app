import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
// COMPONENTS
import WithoutUser from './withoutUser';
import WithUser from './withUser';
// CSS
import * as css from './HeaderStyles';
import * as cssB from '../Button/ButtonStyles';
// UTILS
import { getCookie } from '../../utils/cookie';

interface Props {
  openModal: ({ type: string }: any) => void;
  isUserLoggedIn: boolean;
}
const MainHeader = (props: Props) => {
  const { openModal, isUserLoggedIn } = props;
  console.log('header', isUserLoggedIn);
  return (
    <div css={css.header}>
      <h1 css={css.h1}>
        <Link to="/">BROTE</Link>
      </h1>
      {isUserLoggedIn || getCookie('user') ? <WithUser /> : <WithoutUser openModal={openModal} />}
    </div>
  );
};

export default MainHeader;