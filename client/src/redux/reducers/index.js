import { combineReducers } from 'redux';
// REDUCERS
import { connectRouter } from 'connected-react-router';
import { setEditorContent } from './EditorReducer';
import { postsRequest } from './RequestReducer';
import { triggerModal } from './ModalReducer';
import { auth } from './AuthReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  editor: setEditorContent,
  requests: postsRequest,
  modal: triggerModal,
  auth,
});

export default reducers;
