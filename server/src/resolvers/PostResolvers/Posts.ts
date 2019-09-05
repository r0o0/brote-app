import {
  checkForUser,
  checkForGuest,
} from '../UserResolvers/userUtils';

const Posts = {
  // query
  async posts(_, args, { db, request }) {
    const user = request.user;
    if(!user) throw Error('Not authenticated');
    const totalConnection = await db.query.postsConnection({
      where: {
        author: {
          email: user.email
        }
      }
    }, `{ aggregate { count } }`);
    const total = totalConnection.aggregate.count;
    const draftConnection = await db.query.postsConnection({
      where: {
        author: {
          email: user.email
        },
        isPublished: false,
      }
    }, `{ aggregate { count } }`);
    const drafts = draftConnection.aggregate.count;
    const publishedConnection = await db.query.postsConnection({
      where: {
        author: {
          email: user.email
        },
        isPublished: true,
      }
    }, `{ aggregate { count } }`);
    const published = publishedConnection.aggregate.count;
    const data = await db.query.posts({
      where: {
        author: {
          email: user.email
        }
      }
    });
    return {
      total,
      drafts,
      published,
      data
    };
  },
  publishedPosts(_, args, { db }) {
    return db.query.posts({
      where: {
        isPublished: true
      }
    });
  },
  myDrafts(_, args, { db, request }) {
    const user = request.user;
    if(!user) throw Error('Not authenticated');

    let author;
    if(user.email) {
      const isUser = checkForUser(db, user.email);
      if (isUser) author = user.email;
    }
    if (user.name && !user.email) {
      const isGuest = checkForUser(db, user.name);
      if (isGuest) author = user.name;
    }
    return db.query.posts({
      where: {
        author,
      }
    })
  }
};

export default Posts;