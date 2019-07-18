import { CONTENT_SET, CONTENT_WRITING } from '../constants';

// export interface ContentState {
//   text: string;
//   saved: boolean,
// }

const initialState = {
  text: "Tell a story...",
  saved: false,
};

function setEditorContent(state = initialState, action) {
  console.log('Action', action.type);
  switch (action.type) {
    case CONTENT_SET:
      console.log('set content', action.payload);
      const { text } = action.payload;
      return {
        text,
        saved: true,
      };
    case CONTENT_WRITING:
      return {
        ...state,
        saved: false,
      };
    default:
      return state;
  }
}

export {
  setEditorContent,
};
