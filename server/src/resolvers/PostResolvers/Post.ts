const Post = {
  // mutation
  createDraft(_, { draft }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');

    const role = user.role;
    const data  = {
      title: draft.title,
      content: draft.content,
    }
    if (role !== 'guest') {
      const author = user.email;
      return db.mutation.createPost({
        data: {
          ...data,
          author: {
            connect: {
              email: author
            }
          },
        },
        info
      });
    } else {
      const author = user.username;
      return db.mutation.createPost({
        data: {
          ...data,
          author: {
            connect: {
              username: author
            }
          },
        },
        info
      });
    }
  },
  publish(_, { id }, { db, request }, info) {
    const user = request.user;
    if (!user) throw new Error('Not Signed In!');

    const role = user.role;
    const data = {
      isPublished: true
    }
    if (role !== 'guest') {
      const author = user.email;
      return db.mutation.updatePost({
        data: {
          ...data,
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
    } else {
      const author = user.username;
      return db.mutation.updatePost({
        data: {
          ...data,
          author: {
            connect: {
              username: author
            }
          }
        },
        where: {
          id
        }
      })
    }
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