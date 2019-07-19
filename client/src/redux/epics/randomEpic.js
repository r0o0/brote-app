import { map, delay, switchMap } from 'rxjs/operators';
// CONSTANTS
import { EDITOR_SET, EDITOR_WRITING, EDITOR_SAVED } from "../constants";

// set editor content
const editorEpic = action$ =>
  action$.ofType(EDITOR_WRITING)
  .pipe(
    delay(1000),
    map(action => ({ type: EDITOR_SET, payload: action.payload })),
  );

// save editor content
const saveEditorEpic = action$ =>
  action$.ofType(EDITOR_SET)
  .pipe(
    map(() => ({ type: EDITOR_SAVED }))
  );

export default [
  editorEpic,
  saveEditorEpic,
];
