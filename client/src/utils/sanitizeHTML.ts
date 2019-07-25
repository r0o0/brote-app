import sanitizeHtml from 'sanitize-html';
import * as tags from '../components/RichEditor/tags';

// get tags used in Rich Text Editor
const safeTags = () => {
  const safeTags = [];
  // block element tags
  for (const blockEl in tags.BLOCK_TAGS) {
    safeTags.push(blockEl);
  }
  // inline element tags
  for (const inlineEl in tags.MARK_TAGS) {
    safeTags.push(inlineEl);
  }
  return safeTags;
};

export const getCleaned = (dirtyHTML: string) => {
  const tags = safeTags();
  const cleaned = sanitizeHtml(dirtyHTML, {
    allowedTags: tags,
  });
  return cleaned;
};