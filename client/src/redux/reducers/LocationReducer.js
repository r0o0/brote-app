import { LOCATION_GET, LOCATION_SET } from '../constants';

// export interface LocationState {
//   path: string;
//   name: string;
// }

const initialState = {
  path: "/",
  name: "home",
};

function getLocation(state = initialState, action) {
  console.log('Action', action.type);
  switch (action.type) {
    case LOCATION_GET:
      console.log('get', action.payload);
      return state;
    case LOCATION_SET:
      console.log('set', action.payload);
      return action.payload;
    default:
      return state;
  }
}

export {
  getLocation,
};
