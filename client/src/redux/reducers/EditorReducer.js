// CONSTANTS
import {
  EDITOR_SET,
  EDITOR_WRITING,
  EDITOR_RESET,
  EDITOR_SAVED,
  EDITOR_VALID,
  EDITOR_PUBLISH,
} from '../constants';
// UTILS
import { editorValidator } from '../../utils/editor';

const initialState = {
  data: {
    title: null,
    text: null,
  },
  saved: null,
  valid: null,
};

function setEditorContent(state = initialState, action) {
  // console.log('Action', action.type);
  switch (action.type) {
    case EDITOR_SET:
      if (action.type === EDITOR_SET) {
        const { text, title } = action.payload;
        const keys = Object.keys(action.payload);
        // console.log('%c EDITOR_SET:', 'background: white; color: pink;', action.payload);
        for (const key of keys) {
          let updateData;
          if (key === 'text') {
            updateData = text;
          }
          if (key === 'title') {
            updateData = title;
          }
          return {
            ...state,
            data: {
              ...state.data,
              [key]: updateData,
            }
          }
        }
      }
      break;
    case EDITOR_WRITING:
      return {
        ...state,
        saved: false,
      };
    case EDITOR_RESET:
      return {
        // text: "Tell a story...",
        ...state,
        saved: null,
      }
    case EDITOR_SAVED:
      return {
        ...state,
        saved: true,
      }
    case EDITOR_VALID:
      if (action.type === EDITOR_VALID) {
        const { text, title } = state.data;
        const isValid = editorValidator(text, title);
        return {
          ...state,
          valid: isValid,
        };
      }
      break;
      case EDITOR_PUBLISH:
        console.log('EDITOR_PUBLISH', action.payload);
        return {
          ...state,
        }
    default:
      return state;
  }
}

export {
  setEditorContent,
};
