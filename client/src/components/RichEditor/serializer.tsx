import React from 'react';
import Html, { Rule } from 'slate-html-serializer';
import { BLOCK_TAGS, MARK_TAGS } from './tags';
import store from '../../redux/store';

const image = () => store.subscribe(() => store.getState().editor.data.image);
const src = image ? image: '';

const rules: Rule[] = [
  // block element
  {
    deserialize(el: Element, next: any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
            src: el.getAttribute('src'),
            'data-image-id': el.getAttribute('data-image-id'),
            'data-image-orientation': el.getAttribute('data-image-orientation'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>
                  {children}
                </code>
              </pre>
            );
          case 'paragraph':
            return <p>{children}</p>
          case 'block-quote':
            return <blockquote>{children}</blockquote>;
          case 'heading-one':
            return <h2>{children}</h2>;
          case 'heading-two':
            return <h3>{children}</h3>;
          case 'list-item':
            return <li>{children}</li>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'bulleted-list':
            return <ul>{children}</ul>;
          case 'image':
            const src = obj.data.get('src');
            const classname = obj.data.get('className');
            const id = obj.data.get('data-image-id');
            const orientation = obj.data.get('data-image-orientation');
            return src ?
              <img
                className={classname}
                data-image-id={id}
                data-image-orientation={orientation}
                src={src}
              />
            : null;
        }
      }
    },
  },
  // marks
  {
    deserialize(el: Element, next: any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          data: {
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underlined':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
        }
      }
    },
  },
];

const html = new Html({ rules });

export default html;