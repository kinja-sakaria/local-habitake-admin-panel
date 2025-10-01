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

// ✅ Delete User Mutation
export const DELETE_USER = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(userId: $userId) {
            success
            message
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