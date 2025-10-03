import { gql } from '@apollo/client';

// ✅ Login Mutation
export const LOGIN_USER = gql`
  mutation AdminLogin($input: AdminLoginInput!) {
    adminLogin(input: $input) {
      success
      message
      accessToken
      refreshToken
      userId
      errorCode
    }
  }
`;

export const FORGOTPASS_MUTATION = gql`
  mutation RequestPasswordReset($email: String!) {
    forgotPassword(input: { email: $email }) {
      success
      message
      errorCode
    }
  }
`;

export const OTPVERIFY_MUTATION = gql`
  mutation VerifyUserEmail($input: VerifyEmailInput!) {
    verifyEmailCode(input: $input) {
      success
      message
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($userIds: [ID!]!) {
    deleteUser(userIds: $userIds) {
      success
      message
    }
  }
`;
export const DELETE_MULTIPLE_USER = gql`
  mutation DeleteMultipleUsers($userIds: [ID!]!) {
    deleteUser(userIds: $userIds) {
      success
      message
    }
  }
`;

// ✅ Delete User Mutation
export const USERLOGOUT_MUTATION = gql`
  mutation LogoutCurrentUser($userId: ID!) {
    logoutUser(input: { userId: $userId }) {
      success
      message
      errorCode
    }
  }
`;

// ✅ List Users Query
export const LIST_USERS = gql`
  query ListAllUsers($page: Int, $limit: Int) {
    listUsers(page: $page, limit: $limit) {
      success
      count
      page
      limit
      total_pages
      nextToken
      data {
        userId
        username
        firstName
        lastName
        email
        role
        kycStatus
      }
    }
  }
`;
export const SEARCH_USERS = gql`
  query SearchUsers($searchQuery: String!, $page: Int!, $limit: Int!) {
    searchUsers(searchQuery: $searchQuery, page: $page, limit: $limit) {
      success
      users {
        userId
        username
        email
        firstName
        lastName
        phoneNumber
        role
        status
      }
      pagination {
        current_page
        limit
        total_count
        total_pages
        has_next_page
        has_prev_page
      }
    }
  }
`;