import { action } from 'typesafe-actions';
import {
  // location
  LOCATION_SET
} from '../constants';
import { LocationState } from '../reducers/LocationReducer';

// Location
const setLocation = (payload: LocationState) => action(LOCATION_SET, payload);

export {
  setLocation,
};
