import * as jwt from 'jsonwebtoken';

export const checkForUser = (db, email) => {
  return db.exists.User({ email });
}

export const authorization = (db) => {
  const Authorization = db.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { // <- Verification
      userId: string
    };
    return userId;
  }

  throw new Error('Not authorized.');

};