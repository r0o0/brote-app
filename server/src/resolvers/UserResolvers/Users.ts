const Users = {
  users(_, args, { db }) {
    return db.query.users();
  }
};

export default Users;