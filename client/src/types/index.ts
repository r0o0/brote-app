
export interface Post {
  id: string;
  author: { name: string };
  title: string;
  content: string;
  publishedOn: string;
  savedOn?: string;
  isPublished: boolean;
}

export type Posts = [Post];

export interface Editor {
  data: Post;
  saved: boolean | null;
  valid: boolean | null;
};

export interface Location {
  path: string;
  name: string;
}

export interface Router {
  action: string,
  location: {
    pathname: string,
    search: string,
    hash: string,
    key: string,
  }
}

export interface RouterState {
  router: Router;
}

export interface Auth {
  login: boolean;
  info: {
    username: string | null,
    email: string | null,
    role: string | null,
  };
  isError: boolean;
  error_message: string | null;
}

export interface AuthState {
  auth: Auth;
}

export interface Modal {
  status: boolean;
  type: string | null;
}

export interface ModalState {
  modal: Modal;
}