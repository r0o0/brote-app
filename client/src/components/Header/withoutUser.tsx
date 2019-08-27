import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
// COMPONENTS
import Button from '../Button';
// CSS
import * as cssB from '../Button/ButtonStyles';

interface Props {
  openModal: ({ type: string }: any) => void;
}

const WithoutUser = (props: Props) => {
  const { openModal } = props;
  const triggerSignInModal = () => {
    openModal({ type: 'signIn' });
  };
  const triggerSignUpModal = () => {
    openModal({ type: 'signUp' });
  };
  return (
    <div>
      <Button cssemotion={cssB.btnSignIn} value="Sign In" onClick={triggerSignInModal} />
      <Button cssemotion={[cssB.btnDefault, cssB.btnActive]} value="Start Writing" onClick={triggerSignUpModal} />
    </div>
  );
};

export default WithoutUser;