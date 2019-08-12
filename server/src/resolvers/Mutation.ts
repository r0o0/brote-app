const Mutation = {
  createDraft (_, { title, author, content }, { prisma }, info) {
    return prisma.createDraft(
      {
        data: {
          title,
          author,
          content,
        },
      },
      info
    )
  },
};

export default Mutation;