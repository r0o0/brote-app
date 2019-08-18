const Post = {
  // mutation
  createDraft(_, { draft }, { db }, info) {
    console.log(info);
    return db.mutation.createPost({
      data: {
        title: draft.title,
        content: draft.content,
        author: draft.author,
        savedOn: draft.savedOn
      },
      info
    });
  },
  publish(_, { id }, { db }) {
    return db.mutation.updatePost({
      data: {
        isPublished: true
      },
      where: {
        id
      }
    });
  },
  delete(_, { id }, { db }, info) {
    return db.mutation.deletePost({
      where: {
        id
      },
      info
    });
  }
};

export default Post;