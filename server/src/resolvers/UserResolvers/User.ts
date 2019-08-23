import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { forwardTo } from 'prisma-binding';
// utils
import { checkForUser, authorization } from './userUtils';

export const getUser = {
  async currentUser(_, { id }, { db, request, response }, info) {
    const Authorization = request.get("Authorization");
    if (!Authorization) throw Error('Not Authorized.');

    const token = Authorization.replace('Bearer', '');
    const { userId } = jwt.verify(token, process.env.AUTH_SECRET!);
    // console.log('request', request.headers, request.userId, request);
    if (id !== userId) throw Error('Invalid user.');
    response.cookie('userId', userId, {
      httpOnly: true,
      maxAge: null,
    })

    return await db.query.user({ where: { id } }, info);
  },
}
const User = {
  async signup(_, { email, password }, { db, response }) {
    const userExists = await checkForUser(db, email);

    if (!userExists) {
      const hashedPassword = await hash(password, 10);
      const user = await db.mutation.createUser({
        data: {
          email,
          password: hashedPassword
        }
      });

      const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);
      response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr token
      });
      return {
        token,
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
    const token = jwt.sign({ userId: guest.nawe }, process.env.AUTH_SECRET);
    return {
      token,
      guest
    }
  },
  async signin(_, { email, password }, ctx) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error('User don\'t exist.');

    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Incorrect password');

    const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr token
    });

    return {
      token,
      user
    }
  }
}

export default User;