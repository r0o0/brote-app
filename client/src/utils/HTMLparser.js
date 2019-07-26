
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

const checkFullWord = (toCheck) => {
  let result;

  const endsWithWord = new RegExp("\\b" + toCheck + "\\b").test(toCheck);
  if (!endsWithWord) {
    let newCheck;
    for (let i = 0; i < toCheck.length; i++) {
      newCheck = toCheck.slice(0, -i);
      const endsWithWord = new RegExp("\\b" + newCheck + "\\b").test(newCheck);
      if (endsWithWord) {
        return newCheck + '...';
      }
    }
  } else {
    result = toCheck;
  }

  return result;
};

export const transformToText = (content) => {
  let result;
  const toAssemble = HTMLparser(content);
  const assembler = (acc, curr) => acc + ' ' + curr;
  const assembled = toAssemble.reduce(assembler);
  result = checkFullWord(assembled);

  return result;
}