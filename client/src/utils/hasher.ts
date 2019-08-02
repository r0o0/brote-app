const supportsCrypto = () => { return window.crypto && crypto.subtle && window.TextEncoder };
const algo: string = process.env.REACT_APP_HASH_ALGO as string;

export const hash = (target: string) => {
  const salt = 'a-unique-salt';
  const targetSalted = target + salt;
  const hash = crypto.subtle.digest(algo, new TextEncoder().encode(targetSalted));
  console.log('hash', target, '\n', salt,);
  return hash;
};

export const encryptHash = (hash: any) => {
  const byte = new Uint8Array(hash);
  const result = [...byte].map((b: any) => {
    const hexCode = b.toString(16);
    console.log(hexCode);
    return hexCode;
  });
  console.log('in encrypt', result, hash);
  return result.join('');
};