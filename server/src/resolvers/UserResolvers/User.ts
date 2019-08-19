import { hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// utils
import { checkForUser } from './userUtils';

const User = {
  async signup(_, { email, password }, { db }) {
    const userExists = await checkForUser(db, email);
    console.log('%c check query: ', 'background: blue;', userExists);
    if (!userExists) {
      const hashedPassword = await hash(password, 10);
      console.log('hashedPassword', hashedPassword);
      // console.log('check if user exist', '\n', check);
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
      console.log('USER EXIST');
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
  }

}

export default User;