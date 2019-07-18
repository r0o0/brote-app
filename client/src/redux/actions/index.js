import {
  // location
  LOCATION_SET,
  // LOCATION_GET,
  // TextEditor
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
} from '../constants';

// Location
const setLocation = (payload) => ({ type: LOCATION_SET, payload });

// Editor
const writingContent = (payload) => ({ type: EDITOR_WRITING, payload });
const setContent = (payload) => ({ type: EDITOR_SET, payload });
const resetEditor = () => ({ type: EDITOR_RESET });

export {
  setLocation,
  setContent,
  writingContent,
  resetEditor,
};
