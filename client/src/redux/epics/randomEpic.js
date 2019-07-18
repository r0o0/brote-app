import { map, delay } from 'rxjs/operators';
// CONSTANTS
import { CONTENT_SET, CONTENT_WRITING } from "../constants";

export const editorEpic = action$ =>
  action$.ofType(CONTENT_WRITING)
    .pipe(
     delay(2000), // Asynchronously wait 1000ms then continue
     map(action => (
      {
       type: CONTENT_SET,
       payload: action.payload
      })
    ))

export default [
  editorEpic,
];
