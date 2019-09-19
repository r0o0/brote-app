import console from 'dev-console.macro';
// CONSTANTS
import {
  AUTH_LOGIN,
  AUTH_SIGNOUT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from '../constants';

const initialState = {
  login: false,
  info: {
    username: null,
    email: null,
    role: null,
  },
  isError: false,
  error_message: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        login: true
      }
    case AUTH_LOGIN_SUCCESS:
      console.log(action.type, action.payload);
      const { username, email, role } = action.payload;
      return {
        ...state,
        login: true,
        info: {
          username,
          email,
          role
        }
      }
    case AUTH_SIGNOUT:
      return {
        login: false
      }
    // case AUTH_LOGIN_FAILURE:
    //   return {
    //     ...state,
    //     login: false,
    //     isError: true,
    //     error_message: 'Invalid username or password',
    //   }
    default:
      return state;
  }
}

export {
  auth,
};
