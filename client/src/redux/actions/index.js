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
  REQUEST_POSTS,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POST_SUCCESS,
  // modal
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

// Location
const setLocation = (payload) => ({ type: LOCATION_SET, payload });

// Editor
const writingContent = (payload) => ({ type: EDITOR_WRITING, payload });
const setContent = (payload) => ({ type: EDITOR_SET, payload });
const resetEditor = () => ({ type: EDITOR_RESET });
const savedEditor = (payload) => ({ type: EDITOR_SAVED, payload });
const validEditor = (payload) => ({ type: EDITOR_VALID, payload });
const publishEditor = (payload) => ({ type: EDITOR_PUBLISH, data: payload});

// axios requests
const isRequestSuccess = (payload) => ({ type: REQUEST_SUCCESS, payload });
const requestPosts = (payload) => ({ type: REQUEST_POSTS, payload });
const isRequestPostsSuccess = (payload) => ({ type: REQUEST_POSTS_SUCCESS, payload });
const isRequestPostSuccess = (payload) => ({ type: REQUEST_POST_SUCCESS, payload });

// modal
const openModal = payload => ({ type: OPEN_MODAL });
const closeModal = payload => ({ type: CLOSE_MODAL });

export {
  setLocation,
  setContent,
  writingContent,
  resetEditor,
  savedEditor,
  validEditor,
  publishEditor,
  isRequestSuccess,
  requestPosts,
  isRequestPostsSuccess,
  isRequestPostSuccess,
  openModal,
  closeModal,
};
