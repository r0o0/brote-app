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
// UTILS
import { createUsername } from '../../utils/createUsername';
import { getCookie } from '../../utils/cookie';

interface Props {
  history: History;
  auth: type.Auth;
  loginSuccess: ({}: { email: string, username: string, role: string }) => void;
  checkForLogin: () => void;
}

function App(props: Props) {
  const { history, loginSuccess } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { loading, data, error } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (error) setIsUserLoggedIn(false);
    if (!loading && data) {
      const { email, name, role } = data.currentUser;
      const username = name ? name : createUsername(email);
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
        </Switch>
        <Auth />
      </ConnectedRouter>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ auth }: type.AuthState) => ({ auth });

export default connect(mapStateToProps, actions)(App);