import {
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED
} from '../constants';

const initialState = {
  title: null,
  text: "Tell a story...",
  saved: null,
};

function setEditorContent(state = initialState, action) {
  console.log('Action', action.type);
  switch (action.type) {
    case EDITOR_SET:
      console.log('set EDITOR', action.payload);
      const { text } = action.payload;
      return {
        text,
        saved: null,
      };
    case EDITOR_WRITING:
      return {
        ...state,
        saved: false,
      };
    case EDITOR_RESET:
      return {
        text: "Tell a story...",
        saved: null,
      }
    case EDITOR_SAVED:
      console.log('%c saved action', 'background: green;');
      return {
        ...state,
        saved: true,
      }
    default:
      return state;
  }
}

export {
  setEditorContent,
};
