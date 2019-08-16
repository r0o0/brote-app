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
    author: 'admin', // need login authentication
    title: null,
    content: null,
    savedOn: null,
    image: [{
      id: null,
      data: null,
      type: null,
    }],
  },
  saved: null,
  valid: null,
};

function setEditorContent(state = initialState, action) {
  switch (action.type) {
    case EDITOR_SET:
      if (action.type === EDITOR_SET) {
        const { content, title, image } = action.payload;
        const keys = Object.keys(action.payload);
        console.log('EDITOR SET', action.payload);
        for (const key of keys) {
          let updateData = [];
          if (key === 'content') {
            updateData = content;
          }
          if (key === 'title') {
            updateData = title;
          }
          if (key === 'image') {
            if (state.data.image[0].id !== null) {
              updateData = [...state.data.image];
            }
            updateData.push(image);
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
        ...state,
        saved: null,
      }
    case EDITOR_SAVED:
      return {
        ...state,
        saved: true,
        data: {
          ...state.data,
          savedOn: action.payload,
        }
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
        return state;
    default:
      return state;
  }
}

export {
  setEditorContent,
};
