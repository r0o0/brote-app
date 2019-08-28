import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
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
      {isUserLoggedIn || getCookie('user') ? <WithUser /> : <WithoutUser openModal={openModal} />}
    </div>
  );
};

export default MainHeader;