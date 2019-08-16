// CONSTANTS
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from '../constants';

const initialState = {
  login: false,
  info: {
    user: null,
    password: null,
  },
  isError: false,
  error_message: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      console.log(action.type, action.payload);
      return {
        ...state,
        // login: true,
        info: {
          user: action.payload.id,
        }
      }
    case AUTH_LOGIN_SUCCESS:
      console.log(action.type, action.payload);
      return {
        ...state,
        login: true,
        info: {
          ...state.info,
          password: action.payload,
        },
        isError: false,
        error_message: null,
      }
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: false,
        isError: true,
        error_message: 'Invalid username or password',
      }
    default:
      return state;
  }
}

export {
  auth,
};
