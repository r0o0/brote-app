import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// utils
import {
  checkForUser,
  isAuthenticated,
  getToken,
  setCookie,
  createUsername,
} from './userUtils';

export const currentUser = {
  async currentUser(_, args, { db, request }, info) {
    const AuthenticatedUser = isAuthenticated(request);

    return await db.query.user({ where: { id: AuthenticatedUser.id } }, info);
  },
}

const User = {
  async signup(_, { email, password }, { db, response }) {
    const userExists = await checkForUser(db, email);

    if (!userExists) {
      const hashedPassword = await hash(password, 10);
      // create name(username) from email
      const name = createUsername(email);
      const user = await db.mutation.createUser({
        data: {
          email,
          password: hashedPassword,
          name,
        }
      });

      const token = getToken(user.id);
      // 1yr token
      const maxAge = 1000 * 60 * 60 * 24 * 365;
      setCookie(response, 'token', token, maxAge);

      return {
        token,
        user
      };
    } else {
      throw new Error('User exists');
    }
  },
  async signin(_, { email, password }, { response, db }) {
    const user = await db.query.user({ where: { email } });
    if (!user) throw new Error('User don\'t exist.');

    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Incorrect password');

    const token = getToken(user.id);
    // 1yr token
    const maxAge = 1000 * 60 * 60 * 24 * 365;
    setCookie(response, 'token', token, maxAge);

    return {
      token,
      user
    }
  },
  signout(_, args, { db, response }) {
    response.clearCookie('token');
    return { message: 'See you next time.' };
  }
}

export default User;