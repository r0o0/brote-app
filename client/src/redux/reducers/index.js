import { combineReducers } from 'redux';
// REDUCERS
import { getLocation, LocationState } from './LocationReducer';
import { setEditorContent, ContentState } from './EditorReducer';

// export type RootState = {
//   location: LocationState,
//   editor: ContentState,
// };

const reducers = combineReducers({
  location: getLocation,
  editor: setEditorContent,
});

export default reducers;
