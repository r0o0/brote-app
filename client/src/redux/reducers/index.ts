import { combineReducers } from 'redux';
// REDUCERS
import { getLocation, LocationState } from './LocationReducer';

export type RootState = {
  location: LocationState,
};

const reducers = combineReducers({
  location: getLocation,
});

export default reducers;
