import { combineReducers } from 'redux';
import { history } from '../store';
// REDUCERS
import { connectRouter } from 'connected-react-router';
import { getLocation } from './LocationReducer';
import { setEditorContent } from './EditorReducer';
import { postsRequest } from './RequestReducer';
import { triggerModal } from './ModalReducer';

// const connectRouterReducer = history => connectRouter(history);

// const connectRouterReducer = connectRouter(history);

const reducers = history => combineReducers({
  router: connectRouter(history),
  location: getLocation,
  editor: setEditorContent,
  requests: postsRequest,
  modal: triggerModal,
});

export default reducers;
