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
