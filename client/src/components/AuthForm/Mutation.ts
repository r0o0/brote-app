import gql from 'graphql-tag';

// sign in mutation
export const REQUEST_SIGNIN = gql`
  mutation REQUEST_LOGIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        name
        email
        joinedOn
        role
      }
    }
  }
`;

export const REQUEST_GUEST_SIGNIN = gql`
  mutation REQUEST_GUEST_SIGNIN($name: String!, $password: String!) {
    signinAsGuest(name: $name, password: $password) {
      guest {
        id
        name
        joinedOn
        role
      }
    }
  }
`;

// sign up mutation
export const REQUEST_SIGNUP = gql`
  mutation REQUEST_SIGNUP($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        name
        email
        joinedOn
        role
      }
    }
  }
`;

export const REQUEST_GUEST_SIGNUP = gql`
  mutation REQUEST_GUEST_SIGNUP($username: String!, $password: String!) {
    signupAsGuest(username: $username, password: $password) {
      guest {
        id
        name
        username
        joinedOn
        role
      }
    }
  }
`;
