const Users = {
  users(_, args, { db }) {
    return db.query.users();
  },
  guests(_, args, { db }) {
    return db.query.guests();
  }
};

export default Users;