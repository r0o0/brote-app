import * as jwt from 'jsonwebtoken';

export const checkForUser = (db, email) => {
  return db.exists.User({ email });
}

export const checkForGuest = (db, name) => {
  return db.exists.Guest({ name });
}

export const isAuthenticated = (request) => {
  const AuthenticatedUser = request.user;
  if (!AuthenticatedUser) throw Error('Not Authorized.');

  return AuthenticatedUser;
};

export const getToken = (userId) => jwt.sign({ userId }, process.env.AUTH_SECRET);

export const setCookie = (response, type, toSet, maxAge) => {
  response.cookie(type, toSet, {
    httpOnly: true,
    maxAge,
  });
}

export const createUsername = (target: string) => {
  const isOfTypeEmail = target.indexOf('@') !== -1;
  if (!isOfTypeEmail) throw Error('Not a valid email address');
  if (isOfTypeEmail) return target.split('@')[0];
};
