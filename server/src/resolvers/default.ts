import { prisma } from '../../generated/prisma-client';

// query author in posts
export const User = {
  posts(parent) {
    return prisma.user({ id: parent.id }).posts();
  }
};

export const Guest = {
  posts(parent) {
    return prisma.guest({ id: parent.id }).posts();
  }
}

// query posts in user
export const Post = {
  author(parent) {
    return prisma.post({ id: parent.id }).author();
  }
};