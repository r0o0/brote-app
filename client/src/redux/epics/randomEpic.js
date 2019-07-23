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
} from "../constants";
import { postData } from '../../utils/api';


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

export default [
  editorEpic,
  saveEditorEpic,
  validEditorEpic,
  publishEditorEpic,
];
