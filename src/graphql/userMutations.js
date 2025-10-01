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
  mutation VerifyOTP($email: String!, $code: String!) {
    verifyotp(email: $email, code: $code) {
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
