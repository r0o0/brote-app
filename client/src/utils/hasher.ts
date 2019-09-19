import console from 'dev-console.macro';
const supportsCrypto = () => {
  if ( window.crypto && crypto.subtle && window.TextEncoder) {
    console.log('supports crypto');
  } else {
    console.log('not supported');
  }
};
supportsCrypto();

const algo: string = process.env.REACT_APP_HASH_ALGO as string;
const salt: string = process.env.REACT_APP_HASH_SALT as string;

export const hash = (target: string) => {
  const targetSalted = target + salt;
  const hash = crypto.subtle.digest(algo, new TextEncoder().encode(targetSalted));
  return hash;
};

export const encryptHash = (hash: any) => {
  const byte = new Uint8Array(hash);
  const result = [...byte].map((b: any) => {
    const hexCode = b.toString(16);
    return hexCode;
  });
  return result.join('');
};

