const Query = {
  posts(_, args, { db }) {
    return db.query.posts();
  },
};

export default Query;