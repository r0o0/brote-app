import * as jwt from 'jsonwebtoken';

export const checkForUser = (db, email) => {
  return db.exists.User({ email });
}

export const checkForGuest = (db, username) => {
  return db.exists.User({ username });
}

export const isAuthenticated = (request) => {
  const AuthenticatedUser = request.user;

  if (!AuthenticatedUser) throw Error('Not Authorized.');

  return AuthenticatedUser;
};

export const getToken = (userId, maxAge) => jwt.sign({ userId }, process.env.AUTH_SECRET, { expiresIn: maxAge });

export const setCookie = (response, type, toSet, maxAge, httpOnly) => {
  response.cookie(type, toSet, {
    httpOnly,
    maxAge,
  });
}

export const createUsername = (target: string) => {
  const isOfTypeEmail = target.indexOf('@') !== -1;
  if (!isOfTypeEmail) throw Error('Not a valid email address');
  if (isOfTypeEmail) return target.split('@')[0];
};
