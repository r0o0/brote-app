import { LOCATION_GET, LOCATION_SET } from '../constants';

export interface LocationState {
  path: string;
  name: string;
}

const initialState: LocationState = {
  path: "/",
  name: "home",
};

function getLocation(state = initialState, action: any) {
  console.log('Action', action.type);
  switch (action.type) {
    case LOCATION_GET:
      return state;
    case LOCATION_SET:
      return action.payload;
    default:
      return state;
  }
}

export {
  getLocation,
};
