const Post = {
  // mutation
  createDraft(_, { draft }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');

    const author = request.user.email;
    return db.mutation.createPost({
      data: {
        title: draft.title,
        content: draft.content,
        author: {
          connect: {
            email: author
          }
        },
        // savedOn: draft.savedOn
      },
      info
    });
  },
  publish(_, { id }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');

    const author = request.user.email;
    return db.mutation.updatePost({
      data: {
        isPublished: true,
        author: {
          connect: {
            email: author
          }
        }
      },
      where: {
        id
      }
    }, info);
  },
  delete(_, { id }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');

    const author = request.user.email;
    return db.mutation.deletePost({
      data: {
        author: {
          connect: {
            email: author
          }
        }
      },
      where: {
        id
      }
    }, info);
  }
};

export default Post;