// TextEditor
const EDITOR_SET = '@@editor/SET';
const EDITOR_WRITING = '@@editor/WRITING';
const EDITOR_RESET = '@@editor/RESET';
const EDITOR_SAVED = '@@editor/SAVED';
const EDITOR_VALID = '@@editor/VALID';
const EDITOR_PUBLISH = '@@editor/PUBLISH';
// axios request
const REQUEST_SUCCESS = '@@ajax/SUCCESS';
const REQUEST_POSTS = '@@ajax/POSTS';
const REQUEST_POST = '@@ajax/POST';
const REQUEST_POST_SUCCESS = '@@ajax/POST_SUCCESS';
const REQUEST_POSTS_SUCCESS = '@@ajax/POSTS_SUCCESS';
// MODAL
const OPEN_MODAL = '@@modal/OPEN';
const CLOSE_MODAL = '@@modal/CLOSE';



export {
  // TextEditor
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED,
  EDITOR_VALID,
  EDITOR_PUBLISH,
  // API
  REQUEST_SUCCESS,
  REQUEST_POSTS,
  REQUEST_POST,
  REQUEST_POST_SUCCESS,
  REQUEST_POSTS_SUCCESS,
  // modal
  OPEN_MODAL,
  CLOSE_MODAL,
};