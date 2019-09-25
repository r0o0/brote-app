import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { History } from 'history'
import * as type from '../../types';
import { GET_CURRENT_USER } from './Query';
import { useQuery } from '@apollo/react-hooks';
// COMPONENTS
import Header from '../../components/Header';
import Main from '../Main';
import Write from '../Write';
import Posts from '../Posts';
import Post from '../Post';
import Auth from '../Auth';
import User from '../User';
import Stories from '../User/Stories';
// UTILS
import { getCookie } from '../../utils/cookie';
import RenewAuth from '../../components/AuthForm/RenewAuth';

interface Props {
  history: History;
  auth: type.Auth;
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  signoutSuccess: () => void;
}

function App(props: Props) {
  const { history, loginSuccess, auth, signoutSuccess } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { loading, data, error } = useQuery(GET_CURRENT_USER);
  const [renew, setRenew] = useState(false);
  const expireIn = getCookie('expireIn');
  // timer();

  useEffect(() => {
    if(!auth.login) setIsUserLoggedIn(false);
    if(auth.login) {
      setIsUserLoggedIn(true);
      if (getCookie('user')) {
        setTimeout(() => {
          setRenew(true);
        }, Number(expireIn) - 60000);
        setTimeout(() => {
          signoutSuccess();
          document.cookie = 'user=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }, Number(expireIn));
      }
    }
  }, [auth.login]);

  useEffect(() => {
    if (error) {
      if (getCookie('user')) document.cookie = 'user=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setIsUserLoggedIn(false);
    }
    if (data && data.currentUser == null) document.cookie = 'user=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    if (data && data.currentUser) {
      const { email, name, role } = data.currentUser;
      const username = name;
      // if no user cookie found set cookie
      if (!getCookie('user')) document.cookie = `user=${username};path=/;`;
      setIsUserLoggedIn(true);
      loginSuccess({ email, username, role });
    }
  }, [loading, error, data]);

  return (
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Header isUserLoggedIn={isUserLoggedIn} />
        { renew && <RenewAuth trigger={true} /> }
        <Switch>
          <Route exact path="/" render={() => <Main isUserLoggedIn={isUserLoggedIn} />} />
          <Route path="/new-story" component={Write} />
          <Route path="/posts" component={Posts} />
          <Route path="/p/:id" component={Post} />
          <Route path="/@:user" component={User} />
          <Route path="/edit-story/:id" component={Write} />
        </Switch>
        <Auth />
      </ConnectedRouter>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ auth }: type.AuthState) => ({ auth });

export default connect(mapStateToProps, actions)(App);