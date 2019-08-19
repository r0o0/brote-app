import Posts from './PostResolvers/Posts';
import Users from "./UserResolvers/Users";

const Query = {
  ...Posts,
  ...Users,
};

export default Query;