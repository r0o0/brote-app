import {
  // location
  LOCATION_SET,
  // LOCATION_GET,
  // TextEditor
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED,
  EDITOR_VALID,
  EDITOR_PUBLISH,
  // ajax
  REQUEST_SUCCESS,
} from '../constants';

// Location
const setLocation = (payload) => ({ type: LOCATION_SET, payload });

// Editor
const writingContent = (payload) => ({ type: EDITOR_WRITING, payload });
const setContent = (payload) => ({ type: EDITOR_SET, payload });
const resetEditor = () => ({ type: EDITOR_RESET });
const savedEditor = () => ({ type: EDITOR_SAVED });
const validEditor = (payload) => ({ type: EDITOR_VALID, payload });
const publishEditor = (payload) => ({ type: EDITOR_PUBLISH, data: payload});

const isRequestSuccess = (payload) => ({ type: REQUEST_SUCCESS, payload });

export {
  setLocation,
  setContent,
  writingContent,
  resetEditor,
  savedEditor,
  validEditor,
  publishEditor,
  isRequestSuccess,
};
