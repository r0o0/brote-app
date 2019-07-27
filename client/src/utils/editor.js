// editor, pages/write utils

export const editorValidator = (title, content) => {
  console.log('validator', title, content);
  let isValid;
  if (content === '<p></p>') {
    isValid = false;
  }
  if ((title === undefined || content === undefined) || (title === null || content === null) || (title.length <= 0 || content.length <= 0)) {
    isValid = false;
  }
  if (title !== undefined && content !== undefined && content !== null && title !== null) {
    if (title.length > 0 && content.length > 0) {
      isValid = true;
    }
  }
  return isValid;
};