import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
// COMPONENTS
import WithoutUser from './withoutUser';
import WithUser from './withUser';
// UTILS
import { getCookie } from '../../utils/cookie';

interface Props {
  openModal: ({ type: string }: any) => void;
  isUserLoggedIn: boolean;
}
const MainHeader = (props: Props) => {
  const { openModal, isUserLoggedIn } = props;

  return (
    <React.Fragment>
      { isUserLoggedIn || getCookie('user') ?
        <WithUser userInCookie={getCookie('user')} /> :
        <WithoutUser openModal={openModal} />
      }
    </React.Fragment>
  );
};

export default MainHeader;