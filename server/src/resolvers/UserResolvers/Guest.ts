import { hash, compare } from 'bcryptjs';
// utils
import {
  checkForGuest,
  isAuthenticated,
  getToken,
  setCookie,
} from './userUtils';

export const currentGuest = {
  async currentGuest(_, args, { db, request }, info) {
    const AuthenticatedGuest = isAuthenticated(request);

    return await db.query.guest({ where: { id: AuthenticatedGuest.id } }, info);
  },
}

const Guest = {
  async signupAsGuest(_, { username, password }, { db, response }) {
    const userExists = await checkForGuest(db, username);

    if (userExists) throw new Error ('User exists');

    const hashedPassword = await hash(password, 10);
    const guest = await db.mutation.createUser({
      data: {
        name: "Guest",
        username,
        password: hashedPassword,
        role: "guest"
      }
    });
    const token = getToken(guest.id);
    // 1hr token
    const maxAge = 1000 * 60 * 60;
    setCookie(response, 'token', token, maxAge);
    console.log('guest', token);
    return {
      token,
      guest
    }
  },
  // async signinAsGuest(_, { username, password }, { response, db }) {
  //   const userExists = await checkForGuest(db, username);
  //   const guest = await db.query.user({ where: { username } });
  //   if (!guest) throw new Error('Guest don\'t exist.');

  //   const valid = await compare(password, guest.password);
  //   if (!valid) throw new Error('Incorrect password');

  //   const token = getToken(guest.id);
  //   // 1yr token
  //   const maxAge = 1000 * 60 * 60 * 24 * 365;
  //   setCookie(response, 'token', token, maxAge);

  //   return {
  //     token,
  //     guest
  //   }
  // }
}

export default Guest;