import { EDITOR_SET, EDITOR_WRITING, EDITOR_RESET } from '../constants';

const initialState = {
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
        saved: true,
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
    default:
      return state;
  }
}

export {
  setEditorContent,
};
