import { ofType } from 'redux-observable';
import { map, delay, switchMap, mergeMap, catchError } from 'rxjs/operators';
// CONSTANTS
import {
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_SAVED,
  EDITOR_VALID,
  EDITOR_PUBLISH,
  REQUEST_SUCCESS,
  REQUEST_POSTS,
  REQUEST_POST,
  REQUEST_POST_SUCCESS,
  REQUEST_POSTS_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from "../constants";
import { postData, getData, getUser } from '../../utils/api';
import { getTodayDate } from '../../utils/date';
import { hash, encryptHash } from '../../utils/hasher';

// set editor content
const editorEpic = action$ =>
  action$.ofType(EDITOR_WRITING)
  .pipe(
    delay(500),
    map(action => ({ type: EDITOR_SET, payload: action.payload }))
  );

// save editor content
const saveEditorEpic = action$ =>
  action$.ofType(EDITOR_SET)
  .pipe(
    map(() => getTodayDate()),
    map((date) => {
      console.log('date in epic', date);
      return { type: EDITOR_SAVED, payload: date };
    })
  );

const validEditorEpic = action$ =>
  action$.ofType(EDITOR_SET)
  .pipe(
    map(() => ({ type: EDITOR_VALID }))
  );

// post data
const publishEditorEpic = action$ =>
  action$.ofType(EDITOR_PUBLISH)
  .pipe(
    switchMap(action =>
      postData('posts', action.data)),
    map(res => ({ type: REQUEST_SUCCESS, res }))
  )

// right after post fetch the posted data
const getPostEpic = action$ =>
  action$.ofType(REQUEST_SUCCESS)
  .pipe(
    switchMap(action =>
      getData(`posts/${action.res.data.name}`)),
    map(res => ({ type: REQUEST_POST_SUCCESS, res}))
  )

// fetch posts data
const getPostsEpic = action$ =>
  action$.ofType(REQUEST_POSTS)
  .pipe(
    switchMap(action =>
      getData(action.payload)),
    map(res => ({ type: REQUEST_POSTS_SUCCESS, res }))
  )

// auth
const checkLogin = action$ =>
  action$.ofType(AUTH_LOGIN)
  .pipe(
    switchMap(action => {
      const userInfo = getUser(action.payload.id);
      const hashed = hash(action.payload.pwd);
      return Promise.all([userInfo, hashed]);
    }),
    map(res => {
      const userInfo = res[0];
      const hashed = res[1];
      const toCompare = userInfo.data.password;
      const encrypted = encryptHash(hashed);
      console.log('map hashed', hashed, toCompare, encrypted);
      if (toCompare === encrypted) {
        console.log('user logged in successfully')
        document.cookie = 'user=guest';
        document.cookie = 'logged_in=yes';
        document.cookie = `user_session=${encrypted}`;
        return { type: AUTH_LOGIN_SUCCESS, payload: encrypted };
      } else {
        return { type: AUTH_LOGIN_FAILURE };
      }
    })
  )

export default [
  editorEpic,
  saveEditorEpic,
  validEditorEpic,
  publishEditorEpic,
  getPostsEpic,
  getPostEpic,
  checkLogin,
];
