// creates username from email
export const createUsername = (target: string) => {
  const isOfTypeEmail = target.indexOf('@') !== -1;
  if (!isOfTypeEmail) return target.charAt(0);
  if (isOfTypeEmail) return target.split('@')[0];
};