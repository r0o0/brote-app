// convert string to path
const convertToPath = (path: string) => {
  const lowercasePath = path.toLowerCase();
  const result = lowercasePath.split(' ').join('-');
  return result;
};

export default convertToPath;