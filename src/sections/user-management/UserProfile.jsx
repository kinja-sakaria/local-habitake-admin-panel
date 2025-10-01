import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs, Link, Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { GRID_COMMON_SPACING } from 'config';
import StatusOverview from './StatusOverview';
import UserProfileCard from './UserProfileCard';
import PropertyListingTable from './PropertyListingTable';
import MainCard from 'components/MainCard';
import { GET_USER } from 'graphql/userQueries';
import { useQuery } from '@apollo/client/react';

export default function UserDetails({ user, onClose, activeTab }) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(user);

  // GraphQL query to fetch detailed user data
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { userId: user.id },
    skip: !user?.id, // Skip query if no userId
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all', // Return partial data even if there are errors
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('GraphQL Error:', error);
    },
  });

  // Update userData when API data is received
  useEffect(() => {
    if (data?.getUser?.success && data?.getUser?.data) {
      const apiUserData = data.getUser.data;
      // Transform API data to match expected format
      const transformedUser = {
        id: apiUserData.userId,
        name:
          apiUserData.firstName && apiUserData.lastName
            ? `${apiUserData.firstName} ${apiUserData.lastName}`.trim()
            : apiUserData.firstName || apiUserData.lastName || 'N/A',
        email: apiUserData.email || 'N/A',
        phone: apiUserData.phoneNumber || 'N/A',
        status: apiUserData.status || 'Active',
        role: apiUserData.role || 'N/A',
        kycStatus: apiUserData.kycStatus || 'N/A',
        username: apiUserData.username || 'N/A',
        address: apiUserData.address || 'N/A',
        location: apiUserData.location || 'N/A',
        profilePicture: apiUserData.profilePicture || null,
        bio: apiUserData.bio || 'N/A',
        gender: apiUserData.gender || 'N/A',
        nationality: apiUserData.nationality || 'N/A',
        dateOfBirth:
          apiUserData.dateOfBirth && apiUserData.dateOfBirth.trim()
            ? (() => {
                try {
                  return new Date(apiUserData.dateOfBirth).toLocaleDateString();
                } catch (e) {
                  return apiUserData.dateOfBirth;
                }
              })()
            : 'N/A',
        profileStatus: apiUserData.profileStatus || 'N/A',
        isVerified: apiUserData.isVerified || false,
        mfaEnabled: apiUserData.mfaEnabled || false,
        lastModifiedBy: apiUserData.lastModifiedBy || 'N/A',
        createdAt:
          apiUserData.createdAt && apiUserData.createdAt.trim()
            ? (() => {
                try {
                  return new Date(apiUserData.createdAt).toLocaleDateString();
                } catch (e) {
                  return apiUserData.createdAt;
                }
              })()
            : 'N/A',
        updatedAt:
          apiUserData.updatedAt && apiUserData.updatedAt.trim()
            ? (() => {
                try {
                  return new Date(apiUserData.updatedAt).toLocaleDateString();
                } catch (e) {
                  return apiUserData.updatedAt;
                }
              })()
            : 'N/A',
        credits: apiUserData.credits || 0,
        affiliateCode: apiUserData.affiliateCode || 'N/A',
        agencyId: apiUserData.agencyId || 'N/A',
        preferences: apiUserData.preferences || {},
        documents: apiUserData.documents || [],
      };
      setUserData(transformedUser);
    }
  }, [data]);

  // Show loading state
  if (loading && !userData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography ml={2}>{t('userProfile.loadingUserDetails', { name: user?.name || 'user' })}</Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">
          {t('userProfile.errorLoadingUserDetails')}: {error.message}
        </Alert>
      </Box>
    );
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {t('userProfile.users')}
        </Link>
        <Typography color="text.primary">{userData.name || t('userProfile.userDetails')}</Typography>
      </Breadcrumbs>

      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <UserProfileCard user={userData} activeTab={activeTab} />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 8 }}>
          <StatusOverview user={userData} activeTab={activeTab} />
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid item size={12}>
          <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }}>
            <PropertyListingTable user={userData} activeTab={activeTab} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
