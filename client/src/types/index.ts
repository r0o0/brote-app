export interface Post {
  title: string,
  text: string,
}

export interface Posts {
  [id: string] : {
    data: Post
  }
}

export interface Editor {
  data: {
    title: string,
    text: string,
  };
  saved: boolean | null;
  valid: boolean | null;
};

export interface Location {
  path: string;
  name: string;
}