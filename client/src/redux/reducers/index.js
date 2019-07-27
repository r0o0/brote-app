import { combineReducers } from 'redux';
// REDUCERS
import { connectRouter } from 'connected-react-router';
import { setEditorContent } from './EditorReducer';
import { postsRequest } from './RequestReducer';
import { triggerModal } from './ModalReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  editor: setEditorContent,
  requests: postsRequest,
  modal: triggerModal,
});

export default reducers;
