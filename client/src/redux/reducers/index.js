import { combineReducers } from 'redux';
// REDUCERS
import { getLocation } from './LocationReducer';
import { setEditorContent } from './EditorReducer';
import { postsRequest } from './RequestReducer';

const reducers = combineReducers({
  location: getLocation,
  editor: setEditorContent,
  requests: postsRequest,
});

export default reducers;
