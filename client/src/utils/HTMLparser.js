
const HTMLparser = (content) => {
  const parser = new DOMParser();
  const toHTML = parser.parseFromString(content, 'text/html');
  const parent = toHTML.querySelector('body');
  const children = parent.childNodes;
  let toAssemble = [];

  for (let i = 0; i < children.length; i++) {
    const textOnly = children[i].textContent;
    toAssemble.push(textOnly);
  }

  return toAssemble;
};

export const transformToText = (content) => {
  let result;
  const toAssemble = HTMLparser(content);
  const assembler = (acc, curr) => acc + ' ' + curr;
  const assembled = toAssemble.reduce(assembler);
  result = assembled;

  return result;
}