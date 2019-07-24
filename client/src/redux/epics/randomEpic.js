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
} from "../constants";
import { postData, getData } from '../../utils/api';


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
    map(() => ({ type: EDITOR_SAVED }))
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
      postData('posts', { data: action.data })),
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

export default [
  editorEpic,
  saveEditorEpic,
  validEditorEpic,
  publishEditorEpic,
  getPostsEpic,
  getPostEpic,
];
