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

interface Props {
  history: History;
  auth: type.Auth;
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  checkForLogin: () => void;
}

function App(props: Props) {
  const { history, loginSuccess, auth } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { loading, data, error } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if(!auth.login) setIsUserLoggedIn(false);
    if(auth.login) setIsUserLoggedIn(true);
  }, [auth.login]);

  useEffect(() => {
    if (error) setIsUserLoggedIn(false);
    if (getCookie('user')) setIsUserLoggedIn(true);
    if (data && data.currentUser) {
      const { email, name, role } = data.currentUser;
      const username = name;
      // if no user cookie found set cookie
      if (!getCookie('user')) document.cookie = `user=${username}`;
      setIsUserLoggedIn(true);
      loginSuccess({ email, username, role });
    }
  }, [loading, error, data]);

  return (
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Header isUserLoggedIn={isUserLoggedIn} />
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