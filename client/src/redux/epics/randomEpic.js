import { map, delay } from 'rxjs/operators';
// CONSTANTS
import { EDITOR_SET, EDITOR_WRITING } from "../constants";

export const editorEpic = action$ =>
  action$.ofType(EDITOR_WRITING)
    .pipe(
     delay(2000),
     map(action => (
      {
       type: EDITOR_SET,
       payload: action.payload
      })
    ))

export default [
  editorEpic,
];
