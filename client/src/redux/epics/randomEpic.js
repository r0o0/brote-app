import { map, delay, switchMap } from 'rxjs/operators';
// CONSTANTS
import { EDITOR_SET, EDITOR_WRITING, EDITOR_SAVED, EDITOR_VALID } from "../constants";

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
    // delay(500),
    map(() => ({ type: EDITOR_VALID }))
  );

export default [
  editorEpic,
  saveEditorEpic,
  validEditorEpic,
];
