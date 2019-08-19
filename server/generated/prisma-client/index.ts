// Code generated by Prisma (prisma@1.34.5). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  guest: (where?: GuestWhereInput) => Promise<boolean>;
  post: (where?: PostWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  guest: (where: GuestWhereUniqueInput) => GuestNullablePromise;
  guests: (args?: {
    where?: GuestWhereInput;
    orderBy?: GuestOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Guest>;
  guestsConnection: (args?: {
    where?: GuestWhereInput;
    orderBy?: GuestOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => GuestConnectionPromise;
  post: (where: PostWhereUniqueInput) => PostNullablePromise;
  posts: (args?: {
    where?: PostWhereInput;
    orderBy?: PostOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Post>;
  postsConnection: (args?: {
    where?: PostWhereInput;
    orderBy?: PostOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => PostConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createGuest: (data: GuestCreateInput) => GuestPromise;
  updateGuest: (args: {
    data: GuestUpdateInput;
    where: GuestWhereUniqueInput;
  }) => GuestPromise;
  updateManyGuests: (args: {
    data: GuestUpdateManyMutationInput;
    where?: GuestWhereInput;
  }) => BatchPayloadPromise;
  upsertGuest: (args: {
    where: GuestWhereUniqueInput;
    create: GuestCreateInput;
    update: GuestUpdateInput;
  }) => GuestPromise;
  deleteGuest: (where: GuestWhereUniqueInput) => GuestPromise;
  deleteManyGuests: (where?: GuestWhereInput) => BatchPayloadPromise;
  createPost: (data: PostCreateInput) => PostPromise;
  updatePost: (args: {
    data: PostUpdateInput;
    where: PostWhereUniqueInput;
  }) => PostPromise;
  updateManyPosts: (args: {
    data: PostUpdateManyMutationInput;
    where?: PostWhereInput;
  }) => BatchPayloadPromise;
  upsertPost: (args: {
    where: PostWhereUniqueInput;
    create: PostCreateInput;
    update: PostUpdateInput;
  }) => PostPromise;
  deletePost: (where: PostWhereUniqueInput) => PostPromise;
  deleteManyPosts: (where?: PostWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  guest: (
    where?: GuestSubscriptionWhereInput
  ) => GuestSubscriptionPayloadSubscription;
  post: (
    where?: PostSubscriptionWhereInput
  ) => PostSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type GuestOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "password_ASC"
  | "password_DESC"
  | "joinedOn_ASC"
  | "joinedOn_DESC"
  | "isExpired_ASC"
  | "isExpired_DESC"
  | "role_ASC"
  | "role_DESC";

export type PostOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "author_ASC"
  | "author_DESC"
  | "content_ASC"
  | "content_DESC"
  | "savedOn_ASC"
  | "savedOn_DESC"
  | "publishedOn_ASC"
  | "publishedOn_DESC"
  | "isPublished_ASC"
  | "isPublished_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "joinedOn_ASC"
  | "joinedOn_DESC"
  | "lastLogin_ASC"
  | "lastLogin_DESC"
  | "role_ASC"
  | "role_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type GuestWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface GuestWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  joinedOn?: Maybe<String>;
  joinedOn_not?: Maybe<String>;
  joinedOn_in?: Maybe<String[] | String>;
  joinedOn_not_in?: Maybe<String[] | String>;
  joinedOn_lt?: Maybe<String>;
  joinedOn_lte?: Maybe<String>;
  joinedOn_gt?: Maybe<String>;
  joinedOn_gte?: Maybe<String>;
  joinedOn_contains?: Maybe<String>;
  joinedOn_not_contains?: Maybe<String>;
  joinedOn_starts_with?: Maybe<String>;
  joinedOn_not_starts_with?: Maybe<String>;
  joinedOn_ends_with?: Maybe<String>;
  joinedOn_not_ends_with?: Maybe<String>;
  isExpired?: Maybe<Boolean>;
  isExpired_not?: Maybe<Boolean>;
  role?: Maybe<String>;
  role_not?: Maybe<String>;
  role_in?: Maybe<String[] | String>;
  role_not_in?: Maybe<String[] | String>;
  role_lt?: Maybe<String>;
  role_lte?: Maybe<String>;
  role_gt?: Maybe<String>;
  role_gte?: Maybe<String>;
  role_contains?: Maybe<String>;
  role_not_contains?: Maybe<String>;
  role_starts_with?: Maybe<String>;
  role_not_starts_with?: Maybe<String>;
  role_ends_with?: Maybe<String>;
  role_not_ends_with?: Maybe<String>;
  AND?: Maybe<GuestWhereInput[] | GuestWhereInput>;
}

export type PostWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface PostWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  author?: Maybe<String>;
  author_not?: Maybe<String>;
  author_in?: Maybe<String[] | String>;
  author_not_in?: Maybe<String[] | String>;
  author_lt?: Maybe<String>;
  author_lte?: Maybe<String>;
  author_gt?: Maybe<String>;
  author_gte?: Maybe<String>;
  author_contains?: Maybe<String>;
  author_not_contains?: Maybe<String>;
  author_starts_with?: Maybe<String>;
  author_not_starts_with?: Maybe<String>;
  author_ends_with?: Maybe<String>;
  author_not_ends_with?: Maybe<String>;
  content?: Maybe<String>;
  content_not?: Maybe<String>;
  content_in?: Maybe<String[] | String>;
  content_not_in?: Maybe<String[] | String>;
  content_lt?: Maybe<String>;
  content_lte?: Maybe<String>;
  content_gt?: Maybe<String>;
  content_gte?: Maybe<String>;
  content_contains?: Maybe<String>;
  content_not_contains?: Maybe<String>;
  content_starts_with?: Maybe<String>;
  content_not_starts_with?: Maybe<String>;
  content_ends_with?: Maybe<String>;
  content_not_ends_with?: Maybe<String>;
  savedOn?: Maybe<DateTimeInput>;
  savedOn_not?: Maybe<DateTimeInput>;
  savedOn_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  savedOn_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  savedOn_lt?: Maybe<DateTimeInput>;
  savedOn_lte?: Maybe<DateTimeInput>;
  savedOn_gt?: Maybe<DateTimeInput>;
  savedOn_gte?: Maybe<DateTimeInput>;
  publishedOn?: Maybe<DateTimeInput>;
  publishedOn_not?: Maybe<DateTimeInput>;
  publishedOn_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  publishedOn_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  publishedOn_lt?: Maybe<DateTimeInput>;
  publishedOn_lte?: Maybe<DateTimeInput>;
  publishedOn_gt?: Maybe<DateTimeInput>;
  publishedOn_gte?: Maybe<DateTimeInput>;
  isPublished?: Maybe<Boolean>;
  isPublished_not?: Maybe<Boolean>;
  AND?: Maybe<PostWhereInput[] | PostWhereInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  joinedOn?: Maybe<DateTimeInput>;
  joinedOn_not?: Maybe<DateTimeInput>;
  joinedOn_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  joinedOn_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  joinedOn_lt?: Maybe<DateTimeInput>;
  joinedOn_lte?: Maybe<DateTimeInput>;
  joinedOn_gt?: Maybe<DateTimeInput>;
  joinedOn_gte?: Maybe<DateTimeInput>;
  lastLogin?: Maybe<DateTimeInput>;
  lastLogin_not?: Maybe<DateTimeInput>;
  lastLogin_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  lastLogin_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  lastLogin_lt?: Maybe<DateTimeInput>;
  lastLogin_lte?: Maybe<DateTimeInput>;
  lastLogin_gt?: Maybe<DateTimeInput>;
  lastLogin_gte?: Maybe<DateTimeInput>;
  role?: Maybe<String>;
  role_not?: Maybe<String>;
  role_in?: Maybe<String[] | String>;
  role_not_in?: Maybe<String[] | String>;
  role_lt?: Maybe<String>;
  role_lte?: Maybe<String>;
  role_gt?: Maybe<String>;
  role_gte?: Maybe<String>;
  role_contains?: Maybe<String>;
  role_not_contains?: Maybe<String>;
  role_starts_with?: Maybe<String>;
  role_not_starts_with?: Maybe<String>;
  role_ends_with?: Maybe<String>;
  role_not_ends_with?: Maybe<String>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface GuestCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  password: String;
  joinedOn?: Maybe<String>;
  isExpired?: Maybe<Boolean>;
  role?: Maybe<String>;
}

export interface GuestUpdateInput {
  name?: Maybe<String>;
  password?: Maybe<String>;
  joinedOn?: Maybe<String>;
  isExpired?: Maybe<Boolean>;
  role?: Maybe<String>;
}

export interface GuestUpdateManyMutationInput {
  name?: Maybe<String>;
  password?: Maybe<String>;
  joinedOn?: Maybe<String>;
  isExpired?: Maybe<Boolean>;
  role?: Maybe<String>;
}

export interface PostCreateInput {
  id?: Maybe<ID_Input>;
  title: String;
  author: String;
  content: String;
  savedOn?: Maybe<DateTimeInput>;
  publishedOn?: Maybe<DateTimeInput>;
  isPublished?: Maybe<Boolean>;
}

export interface PostUpdateInput {
  title?: Maybe<String>;
  author?: Maybe<String>;
  content?: Maybe<String>;
  savedOn?: Maybe<DateTimeInput>;
  publishedOn?: Maybe<DateTimeInput>;
  isPublished?: Maybe<Boolean>;
}

export interface PostUpdateManyMutationInput {
  title?: Maybe<String>;
  author?: Maybe<String>;
  content?: Maybe<String>;
  savedOn?: Maybe<DateTimeInput>;
  publishedOn?: Maybe<DateTimeInput>;
  isPublished?: Maybe<Boolean>;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name?: Maybe<String>;
  email: String;
  password: String;
  joinedOn?: Maybe<DateTimeInput>;
  lastLogin?: Maybe<DateTimeInput>;
  role?: Maybe<String>;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  joinedOn?: Maybe<DateTimeInput>;
  lastLogin?: Maybe<DateTimeInput>;
  role?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  joinedOn?: Maybe<DateTimeInput>;
  lastLogin?: Maybe<DateTimeInput>;
  role?: Maybe<String>;
}

export interface GuestSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<GuestWhereInput>;
  AND?: Maybe<GuestSubscriptionWhereInput[] | GuestSubscriptionWhereInput>;
}

export interface PostSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<PostWhereInput>;
  AND?: Maybe<PostSubscriptionWhereInput[] | PostSubscriptionWhereInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface Guest {
  id: ID_Output;
  name: String;
  password: String;
  joinedOn?: String;
  isExpired?: Boolean;
  role?: String;
}

export interface GuestPromise extends Promise<Guest>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<String>;
  isExpired: () => Promise<Boolean>;
  role: () => Promise<String>;
}

export interface GuestSubscription
  extends Promise<AsyncIterator<Guest>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  joinedOn: () => Promise<AsyncIterator<String>>;
  isExpired: () => Promise<AsyncIterator<Boolean>>;
  role: () => Promise<AsyncIterator<String>>;
}

export interface GuestNullablePromise
  extends Promise<Guest | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<String>;
  isExpired: () => Promise<Boolean>;
  role: () => Promise<String>;
}

export interface GuestConnection {
  pageInfo: PageInfo;
  edges: GuestEdge[];
}

export interface GuestConnectionPromise
  extends Promise<GuestConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<GuestEdge>>() => T;
  aggregate: <T = AggregateGuestPromise>() => T;
}

export interface GuestConnectionSubscription
  extends Promise<AsyncIterator<GuestConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<GuestEdgeSubscription>>>() => T;
  aggregate: <T = AggregateGuestSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface GuestEdge {
  node: Guest;
  cursor: String;
}

export interface GuestEdgePromise extends Promise<GuestEdge>, Fragmentable {
  node: <T = GuestPromise>() => T;
  cursor: () => Promise<String>;
}

export interface GuestEdgeSubscription
  extends Promise<AsyncIterator<GuestEdge>>,
    Fragmentable {
  node: <T = GuestSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateGuest {
  count: Int;
}

export interface AggregateGuestPromise
  extends Promise<AggregateGuest>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateGuestSubscription
  extends Promise<AsyncIterator<AggregateGuest>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface Post {
  id: ID_Output;
  title: String;
  author: String;
  content: String;
  savedOn?: DateTimeOutput;
  publishedOn?: DateTimeOutput;
  isPublished?: Boolean;
}

export interface PostPromise extends Promise<Post>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  author: () => Promise<String>;
  content: () => Promise<String>;
  savedOn: () => Promise<DateTimeOutput>;
  publishedOn: () => Promise<DateTimeOutput>;
  isPublished: () => Promise<Boolean>;
}

export interface PostSubscription
  extends Promise<AsyncIterator<Post>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  author: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  savedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  publishedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  isPublished: () => Promise<AsyncIterator<Boolean>>;
}

export interface PostNullablePromise
  extends Promise<Post | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  author: () => Promise<String>;
  content: () => Promise<String>;
  savedOn: () => Promise<DateTimeOutput>;
  publishedOn: () => Promise<DateTimeOutput>;
  isPublished: () => Promise<Boolean>;
}

export interface PostConnection {
  pageInfo: PageInfo;
  edges: PostEdge[];
}

export interface PostConnectionPromise
  extends Promise<PostConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<PostEdge>>() => T;
  aggregate: <T = AggregatePostPromise>() => T;
}

export interface PostConnectionSubscription
  extends Promise<AsyncIterator<PostConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<PostEdgeSubscription>>>() => T;
  aggregate: <T = AggregatePostSubscription>() => T;
}

export interface PostEdge {
  node: Post;
  cursor: String;
}

export interface PostEdgePromise extends Promise<PostEdge>, Fragmentable {
  node: <T = PostPromise>() => T;
  cursor: () => Promise<String>;
}

export interface PostEdgeSubscription
  extends Promise<AsyncIterator<PostEdge>>,
    Fragmentable {
  node: <T = PostSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregatePost {
  count: Int;
}

export interface AggregatePostPromise
  extends Promise<AggregatePost>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregatePostSubscription
  extends Promise<AsyncIterator<AggregatePost>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface User {
  id: ID_Output;
  name?: String;
  email: String;
  password: String;
  joinedOn?: DateTimeOutput;
  lastLogin?: DateTimeOutput;
  role?: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<DateTimeOutput>;
  lastLogin: () => Promise<DateTimeOutput>;
  role: () => Promise<String>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  joinedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  lastLogin: () => Promise<AsyncIterator<DateTimeOutput>>;
  role: () => Promise<AsyncIterator<String>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<DateTimeOutput>;
  lastLogin: () => Promise<DateTimeOutput>;
  role: () => Promise<String>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface GuestSubscriptionPayload {
  mutation: MutationType;
  node: Guest;
  updatedFields: String[];
  previousValues: GuestPreviousValues;
}

export interface GuestSubscriptionPayloadPromise
  extends Promise<GuestSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = GuestPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = GuestPreviousValuesPromise>() => T;
}

export interface GuestSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<GuestSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = GuestSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = GuestPreviousValuesSubscription>() => T;
}

export interface GuestPreviousValues {
  id: ID_Output;
  name: String;
  password: String;
  joinedOn?: String;
  isExpired?: Boolean;
  role?: String;
}

export interface GuestPreviousValuesPromise
  extends Promise<GuestPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<String>;
  isExpired: () => Promise<Boolean>;
  role: () => Promise<String>;
}

export interface GuestPreviousValuesSubscription
  extends Promise<AsyncIterator<GuestPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  joinedOn: () => Promise<AsyncIterator<String>>;
  isExpired: () => Promise<AsyncIterator<Boolean>>;
  role: () => Promise<AsyncIterator<String>>;
}

export interface PostSubscriptionPayload {
  mutation: MutationType;
  node: Post;
  updatedFields: String[];
  previousValues: PostPreviousValues;
}

export interface PostSubscriptionPayloadPromise
  extends Promise<PostSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = PostPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = PostPreviousValuesPromise>() => T;
}

export interface PostSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<PostSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = PostSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = PostPreviousValuesSubscription>() => T;
}

export interface PostPreviousValues {
  id: ID_Output;
  title: String;
  author: String;
  content: String;
  savedOn?: DateTimeOutput;
  publishedOn?: DateTimeOutput;
  isPublished?: Boolean;
}

export interface PostPreviousValuesPromise
  extends Promise<PostPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  author: () => Promise<String>;
  content: () => Promise<String>;
  savedOn: () => Promise<DateTimeOutput>;
  publishedOn: () => Promise<DateTimeOutput>;
  isPublished: () => Promise<Boolean>;
}

export interface PostPreviousValuesSubscription
  extends Promise<AsyncIterator<PostPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  author: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  savedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  publishedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  isPublished: () => Promise<AsyncIterator<Boolean>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
  id: ID_Output;
  name?: String;
  email: String;
  password: String;
  joinedOn?: DateTimeOutput;
  lastLogin?: DateTimeOutput;
  role?: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  joinedOn: () => Promise<DateTimeOutput>;
  lastLogin: () => Promise<DateTimeOutput>;
  role: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  joinedOn: () => Promise<AsyncIterator<DateTimeOutput>>;
  lastLogin: () => Promise<AsyncIterator<DateTimeOutput>>;
  role: () => Promise<AsyncIterator<String>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Guest",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_MANAGEMENT_API_SECRET"]}`
});
export const prisma = new Prisma();
