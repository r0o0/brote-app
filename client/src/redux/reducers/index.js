import { combineReducers } from 'redux';
// REDUCERS
import { getLocation } from './LocationReducer';
import { setEditorContent } from './EditorReducer';
import { postsRequest } from './RequestReducer';
import { triggerModal } from './ModalReducer';

const reducers = combineReducers({
  location: getLocation,
  editor: setEditorContent,
  requests: postsRequest,
  modal: triggerModal,
});

export default reducers;
