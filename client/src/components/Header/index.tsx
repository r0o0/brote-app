// Header.js

import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import * as type from '../../types';
import { Link } from 'react-router-dom';
// COMPONENTS
import MainHeader from './MainHeader';
import WriteHeader from './WriteHeader';
// CSS
import * as css from './HeaderStyles';
import moment from 'moment';

interface Props {
  openModal: () => void;
  router: type.Router;
  isUserLoggedIn: boolean;
}

function Header(props: Props) {
  const {
    openModal,
    router,
    isUserLoggedIn,
  } = props;

  const locationPath = router.location.pathname;
  // path condition
  const inGeneral = locationPath.indexOf('/') !== -1;
  const exclude = locationPath.indexOf('-story') !== -1;

  return (
    <header
      css={locationPath !== '/new-story' ?
        css.header :
        [css.header, css.headerBig]
      }
    >
      <h1 css={css.h1}>
        <Link to="/">BROTE</Link>
      </h1>
      <div css={css.headerRight}>
        { (inGeneral && !exclude) && <MainHeader isUserLoggedIn={isUserLoggedIn} openModal={openModal} /> }
        { locationPath.indexOf('-story') !== -1 && <WriteHeader locationPath={locationPath} /> }
      </div>
    </header>
  );
}

const mapStateToProps = ({ router }: type.RouterState ) => ({ router });

export default connect(mapStateToProps, actions)(Header);
