import Post from './PostResolvers/Post';
import User from './UserResolvers/User';

const Mutation = {
  ...Post,
  ...User,
};

export default Mutation;