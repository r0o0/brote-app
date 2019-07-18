import {
  // location
  LOCATION_SET,
  // LOCATION_GET,
  // TextEditor
  CONTENT_SET,
  CONTENT_WRITING,
} from '../constants';

// Location
const setLocation = (payload) => ({ type: LOCATION_SET, payload });

// Editor
const writingContent = (payload) => ({ type: CONTENT_WRITING, payload });
const setContent = (payload) => ({ type: CONTENT_SET, payload });

export {
  setLocation,
  setContent,
  writingContent,
};
