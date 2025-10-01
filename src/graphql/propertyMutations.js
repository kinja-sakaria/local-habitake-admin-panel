import { gql } from '@apollo/client';

// ✅ Bulk Property Approval Mutation
export const BULK_APPROVE_PROPERTIES = gql`
    mutation BulkApproveProperties($input: BulkPropertyApprovalInput!) {
        bulkApproveProperties(input: $input) {
            success
            message
            data {
                results {
                    propertyId
                    success
                    approved
                    approvalStatus
                }
                errors {
                    propertyId
                    error
                }
                totalProcessed
                successCount
                errorCount
            }
        }
    }
`;

// ✅ Single Property Approval Mutation (if needed)
export const APPROVE_PROPERTY = gql`
    mutation ApproveProperty($propertyId: ID!, $approved: Boolean!, $notes: String) {
        approveProperty(propertyId: $propertyId, approved: $approved, notes: $notes) {
            success
            message
            data {
                id
                approvalStatus
                approvedAt
                approvedBy
            }
        }
    }
`;
