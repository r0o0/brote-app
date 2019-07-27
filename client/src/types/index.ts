export interface Post {
  author: string,
  title: string,
  content: string,
  publishedOn: string,
}

export interface Posts {
  [id: string] : Post
}

export interface Editor {
  data: Post;
  saved: boolean | null;
  valid: boolean | null;
};

export interface Location {
  path: string;
  name: string;
}