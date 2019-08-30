import Post from './PostResolvers/Post';
import User from './UserResolvers/User';
import Guest from './UserResolvers/Guest';

const Mutation = {
  ...Post,
  ...User,
  ...Guest,
};

export default Mutation;