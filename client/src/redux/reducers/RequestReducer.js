import { REQUEST_SUCCESS } from '../constants';

const intialState = {
  status: null,
};

function postsRequest (state = intialState, action) {
  switch(action.type) {
    case REQUEST_SUCCESS:
      console.log('SUCCESS', action);
      const { status } = action.res;
      if (status === 200) {
        return {
          status: 'success',
        };
      }
      break;
    default:
      return state;
  }
}

export {
  postsRequest
};