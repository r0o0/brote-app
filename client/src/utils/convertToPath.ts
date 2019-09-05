// convert string to path
const convertToPath = (path: string) => {
  if (!path) return;
  const lowercasePath = path.toLowerCase();
  const result = lowercasePath.split(' ').join('-');
  return result;
};

export default convertToPath;