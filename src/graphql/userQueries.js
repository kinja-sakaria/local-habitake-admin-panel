// src/graphql/userQueries.js
import { gql } from "@apollo/client";

// ✅ List Users Query with Role Filtering
export const LIST_USERS = gql`
    query ListPaginatedUsers($page: Int, $limit: Int, $role: String) {
        listUsers(page: $page, limit: $limit, role: $role) {
            success
            users {
                userId
                phoneNumber
                status
                firstName
                lastName
                email
                role
                profilePicture
            }
            pagination {
                current_page
                has_next_page
                has_prev_page
                limit
                total_count
                total_pages
            }
            filters {
                role
                status
                email
                name
                phone
                registration_date
            }
        }
    }
`;

// ✅ Get Single User Query
export const GET_USER = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            success
            message
            data {
                userId
                firstName
                lastName
                email
                username
                phoneNumber
                address
                location
                profilePicture
                bio
                gender
                nationality
                dateOfBirth
                status
                role
                kycStatus
                profileStatus
                isVerified
                mfaEnabled
                lastModifiedBy
                credits
                affiliateCode
                agencyId
                preferences
                documents
            }
        }
    }
`;
