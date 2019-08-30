import Posts from './PostResolvers/Posts';
import Users from './UserResolvers/Users';
import Guests from './UserResolvers/Guests';
import { currentUser } from './UserResolvers/User';
import { currentGuest } from './UserResolvers/Guest';

const Query = {
  ...Posts,
  ...Users,
  ...currentUser,
  ...Guests,
  ...currentGuest,
};

export default Query;