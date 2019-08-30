import { hash, compare } from 'bcryptjs';
// utils
import {
  checkForGuest,
  isAuthenticated,
  getToken,
  setCookie,
} from './userUtils';

export const currentGuest = {
  async currentUser(_, args, { db, request }, info) {
    const AuthenticatedUser = isAuthenticated(request);

    return await db.query.guest({ where: { id: AuthenticatedUser.id} }, info);
  },
}

const Guest = {
  async signupAsGuest(_, { name, password }, { db, response }) {
    const hashedPassword = await hash(password, 10);
    const guest = await db.mutation.createGuest({
      data: {
        name,
        password: hashedPassword,
      }
    });
    const token = getToken(guest.id);
      // 1hr token
      const maxAge = 1000 * 60 * 60;
      setCookie(response, 'token', token, maxAge);
    return {
      token,
      guest
    }
  },
  async signinAsGuest(_, { name, password }, { response, db }) {
    const userExists = await checkForGuest(db, name);
    const guest = await db.query.guest({ where: { name } });
    if (!guest) throw new Error('Guest don\'t exist.');

    const valid = await compare(password, guest.password);
    if (!valid) throw new Error('Incorrect password');

    const token = getToken(guest.id);
    // 1yr token
    const maxAge = 1000 * 60 * 60 * 24 * 365;
    setCookie(response, 'token', token, maxAge);

    return {
      token,
      guest
    }
  }
}

export default Guest;