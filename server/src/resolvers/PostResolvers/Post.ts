const Post = {
  // mutation
  createDraft(_, { draft }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');
    console.log('check ', request.user.email);
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
        savedOn: draft.savedOn
      },
      info
    });
  },
  publish(_, { id }, { db, request }) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');
    const author = request.user.email;
    return db.mutation.updatePost({
      data: {
        isPublished: true,
        author: {
          upsert: {
            where: {
              email: author
            }
          }
        }
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