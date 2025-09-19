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

