import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// utils
import { checkForUser, authorization } from './userUtils';

export const getUser = {
  async currentUser(_, { id }, { db, request }, info) {
    const Authorization = request.get("Authorization");

    if (!Authorization) throw Error('Not Authorized.');

    const token = Authorization.replace('Bearer', '');
    const { userId } = jwt.verify(token, process.env.AUTH_SECRET!);

    if (id !== userId) throw Error('Invalid user.');

    return await db.query.user({ where: { id } }, info);
  },
}
const User = {
  async signup(_, { email, password }, { db }) {
    const userExists = await checkForUser(db, email);

    if (!userExists) {
      const hashedPassword = await hash(password, 10);
      const user = await db.mutation.createUser({
        data: {
          email,
          password: hashedPassword
        }
      });

      return {
        token: jwt.sign({ userId: user.id }, process.env.AUTH_SECRET),
        user
      };
    } else {
      throw new Error('User exists');
    }
  },
  async signupAsGuest(_, { name, password }, { db }) {
    const guest = await db.mutation.createGuest({
      data: {
        name,
        password
      }
    });
    return {
      token: jwt.sign({
        userId: guest.name,
      },
        process.env.AUTH_SECRET,
        // { expiresIn: '10min' }
      ),
      guest
    }
  },
  async login(_, { email, password }, { db }) {
    const user = await db.query.user({ where: { email } });

    if (!user) throw new Error('User don\'t exist.');

    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Incorrect password');
    return {
      token: jwt.sign({ userId: user.id }, process.env.AUTH_SECRET),
      user
    }
  }
}

export default User;