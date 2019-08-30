const Posts = {
  // query
  posts(_, args, { db }) {
    return db.query.posts();
  },
  publishedPosts(_, args, { db }) {
    return db.query.posts({
      where: {
        isPublished: true
      }
    });
  },
};

export default Posts;