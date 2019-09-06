// CONSTANTS
import {
  REQUEST_SUCCESS,
} from '../constants';

const intialState = {
  'signup': {
    actionType: 'ON_CLICK',
    condition: 'no signed in user',
    takeAction: 'OPEN_MODAL',
    status: true, // default false
    description: 'open signup dialog by default',
  },
  'signin': {
    actionType: 'ON_CLICK',
    condition: null,
    takeAction: 'OPEN_MODAL',
    status: true, // default false
    description: 'open signin dialog',
  },
  'write': {
    actionType: 'ON_CLICK',
    condition: 'no logged in user',
    takeAction: 'OPEN_MODAL',
    status: true, // default false
    description: 'open signin dialog',
  }
};

// in epic
// action: ON_CLICK type write
// check condition: CHECK_FOR_SIGNEDIN_USER / CHECK_AUTH
// return true -> link to /new-story
// return false -> OPEN_MODAL signup

function clickEvents (state = intialState, action) {
  switch(action.type) {
    case REQUEST_SUCCESS:
      console.log('SUCCESS', action);
      const { status, config, data } = action.res;
      if (status === 200) {
        if (config.method === 'post') {
          return {
            ...state,
            status: 'success',
            key: data,
          };
        }
      }
      break;
    default:
      return state;
  }
}

export {
  clickEvents
};