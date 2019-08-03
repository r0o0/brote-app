export const getCookie = (name: string) => {
  let result;
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for(const i in cookies) {
    const checkForName = cookies[i].indexOf(cookieName);
    if (checkForName !== -1) {
      const theCookie = cookies[i];
      const getResult = theCookie.split('=');
      result = getResult[1];
    }
  }
  return result;
};