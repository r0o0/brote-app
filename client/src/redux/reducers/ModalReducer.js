// CONSTANTS
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

const intialState = {
  status: false,
};

function triggerModal (state = intialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        status: true,
      }
    case CLOSE_MODAL:
      return {
        status: false,
      }
    default:
      return state;
  }
}

export {
  triggerModal
};