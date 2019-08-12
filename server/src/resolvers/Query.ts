const Query = {
  posts(_, args, { prisma }) {
    return prisma.posts();
  },
};

export default Query;