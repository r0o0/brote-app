import console from 'dev-console.macro';
// CONSTANTS
import {
  REQUEST_SUCCESS,
  REQUEST_POSTS,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POST_SUCCESS
} from '../constants';

const intialState = {
  status: null,
};

function postsRequest (state = intialState, action) {
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
    case REQUEST_POSTS:
      console.log('FETCH', action);
      return {
        ...state,
      };
    case REQUEST_POSTS_SUCCESS:
      console.log('FETCH POSTS SUCCESS', action);
      return {
        status: 'fetch posts success',
        data: action.res.data,
      };
    case REQUEST_POST_SUCCESS:
      const prevState = state.data;
      const requestURL = action.res.config.url;
      const key = requestURL.split('/').pop().slice(0, -5);
      console.log('FETCH POST SUCCESS', `\n`,
        'action', action, '\n',
        'prevState', prevState,
      );
        return {
          status: 'update success',
          data: {
            ...state.data,
            [key]: action.res.data,
          }
        }
    default:
      return state;
  }
}

export {
  postsRequest
};