const Mutation = {
  createDraft (_, { title, author, content }, { db }, info) {
    return db.mutation.createDraft(
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