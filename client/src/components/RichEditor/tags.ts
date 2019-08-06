interface TAGS {
  [key: string]: string;
};

const BLOCK_TAGS: TAGS = {
  p: 'paragraph',
  blockquote: 'block-quote',
  pre: 'code',
  h2: 'heading-one',
  h3: 'heading-two',
  li: 'list-item',
  ol: 'numbered-list',
  ul: 'bulleted-list',
  img: 'image',
};

const MARK_TAGS: TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underlined',
  code: 'code',
};

export {
  BLOCK_TAGS,
  MARK_TAGS,
};
