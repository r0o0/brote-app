// Main.js
import React, { Fragment } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
// COMPONENTS
import Button from '../../components/Button';
// CSS
import * as css from './MainStyles';

interface Props {
  isUserLoggedIn: boolean;
  openModal: ({}: { type: string }) => void;
}

function Main(props: Props) {
  const { isUserLoggedIn, openModal } = props;

  return (
    <div className="container" css={css.main}>
      <div css={css.wrapper}>
        <p css={css.paragraph}>
          Are you a <span css={css.span}>writer</span>,<br></br>
          A <Link to="/posts"><span css={css.span}>story</span></Link> enthusiast,<br></br>
          A passionate <span css={css.span}>storyteller</span>?<br></br>
        </p>
        { isUserLoggedIn ?
          <Link to="/new-story" css={css.button}>Write New Story</Link> :
          <Button
            css={css.button}
            value="Write New Story"
            onClick={() => openModal({ type: 'signUp' })}
          />
        }
      </div>
    </div>
  )
}

export default connect(null, actions)(Main);
