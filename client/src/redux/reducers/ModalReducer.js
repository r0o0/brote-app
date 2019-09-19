import console from 'dev-console.macro';
// CONSTANTS
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

const intialState = {
  status: false,
  type: null,
};

function triggerModal (state = intialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      console.log('open modal reducer', action.payload);
      return {
        status: true,
        type: action.payload.type,
      }
    case CLOSE_MODAL:
      return {
        status: false,
        type: null,
      }
    default:
      return state;
  }
}

export {
  triggerModal
};