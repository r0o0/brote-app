import Posts from './PostResolvers/Posts';
import Users from './UserResolvers/Users';
import { getUser } from './UserResolvers/User';
const Query = {
  ...Posts,
  ...Users,
  ...getUser,
};

export default Query;