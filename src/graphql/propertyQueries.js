// src/graphql/propertyQueries.js
import { gql } from "@apollo/client";

// ✅ List Properties Query (Exact Schema Match)
export const LIST_PROPERTIES = gql`
    query ListAllProperties(
        $propertyType: PropertyType,
        $limit: Int,
        $page: Int,
        $approvalStatus: ApprovalStatus
    ) {
        listProperties(
            propertyType: $propertyType,
            limit: $limit,
            page: $page,
            approvalStatus: $approvalStatus
        ) {
            success
            count
            nextToken
            totalPages
            totalCount
            hasNextPage
            hasPreviousPage
            data {
                id
                userId
                agentId
                title
                description
                address
                city
                state
                zipCode
                country
                propertyType
                price
                bedrooms
                bathrooms
                squareFeet
                lotSize
                yearBuilt
                amenities
                images
                status
                approvalStatus
                isFeatured
                viewsCount
                visitsCount
                createdAt
                updatedAt
                approvedAt
                approvedBy
                category
                condition
                seoOptimized
                totalFloors
                floorNumber
                parkingSpots
                district
                firstName
                lastName
                email
                phoneNumber
                documents {
                    id
                    name
                    fileUrl
                    documentType
                }
                visits {
                    id
                    visitorName
                    visitDate
                    status
                }
            }
        }
    }
`;

// ✅ Simplified List Properties Query for Basic Pagination
export const LIST_PROPERTIES_SIMPLE = gql`
    query ListPropertiesSimple($propertyType: PropertyType, $limit: Int, $page: Int) {
        listProperties(propertyType: $propertyType, limit: $limit, page: $page) {
            success
            count
            totalPages
            totalCount
            hasNextPage
            hasPreviousPage
            currentPage
            data {
                id
                userId
                agentId
                title
                description
                address
                city
                state
                zipCode
                country
                propertyType
                price
                bedrooms
                bathrooms
                squareFeet
                lotSize
                yearBuilt
                amenities
                images
                status
                approvalStatus
                isFeatured
                viewsCount
                visitsCount
                createdAt
                updatedAt
                approvedAt
                approvedBy
                category
                condition
                seoOptimized
                totalFloors
                floorNumber
                parkingSpots
                district
                firstName
                lastName
                email
                phoneNumber
                documents {
                    id
                    name
                    fileUrl
                    documentType
                }
                visits {
                    id
                    visitorName
                    visitDate
                    status
                }
            }
        }
    }
`;

// ✅ Basic List Properties Query (Matches Original Schema)
export const LIST_PROPERTIES_BASIC = gql`
    query ListAllProperties($propertyType: PropertyType, $limit: Int, $page: Int) {
        listProperties(propertyType: $propertyType, limit: $limit, page: $page) {
            success
            count
            nextToken
            totalPages
            totalCount
            hasNextPage
            hasPreviousPage
            data {
                id
                userId
                agentId
                title
                description
                address
                city
                state
                zipCode
                country
                propertyType
                price
                bedrooms
                bathrooms
                squareFeet
                lotSize
                yearBuilt
                amenities
                images
                status
                approvalStatus
                isFeatured
                viewsCount
                visitsCount
                createdAt
                updatedAt
                approvedAt
                approvedBy
                category
                condition
                seoOptimized
                totalFloors
                floorNumber
                parkingSpots
                district
                firstName
                lastName
                email
                phoneNumber
                documents {
                    id
                    name
                    fileUrl
                    documentType
                }
                visits {
                    id
                    visitorName
                    visitDate
                    status
                }
            }
        }
    }
`;

// ✅ Get Single Property Query
export const GET_PROPERTY = gql`
    query GetCompletePropertyDetails($propertyId: ID!) {
        getProperty(propertyId: $propertyId) {
            success
            message
            data {
                id
                userId
                agentId
                title
                description
                address
                city
                state
                district
                zipCode
                country
                category
                condition
                seoOptimized
                phoneNumber
                totalFloors
                floorNumber
                parkingSpots
                bathrooms
                firstName
                lastName
                email
                price
                propertyType
                bedrooms
                squareFeet
                lotSize
                yearBuilt
                amenities
                images
                status
                approvalStatus
                isFeatured
                viewsCount
                visitsCount
                createdAt
                updatedAt
                approvedAt
                approvedBy
                visits {
                    id
                    propertyId
                    visitorId
                    visitorName
                    visitorEmail
                    visitorPhone
                    visitDate
                    status
                    notes
                    createdAt
                }
            }
        }
    }
`;

// ✅ Count Queries for ActionButtons
export const GET_APPROVED_PROPERTIES_COUNT = gql`
    query GetApprovedPropertiesCount {
        listProperties(approvalStatus: APPROVED, limit: 1, page: 1) {
            totalCount
        }
    }
`;

export const GET_PENDING_PROPERTIES_COUNT = gql`
    query GetPendingPropertiesCount {
        listProperties(approvalStatus: PENDING, limit: 1, page: 1) {
            totalCount
        }
    }
`;

export const GET_REJECTED_PROPERTIES_COUNT = gql`
    query GetRejectedPropertiesCount {
        listProperties(approvalStatus: REJECTED, limit: 1, page: 1) {
            totalCount
        }
    }
`;
