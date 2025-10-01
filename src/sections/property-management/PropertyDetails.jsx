import { useState, useEffect } from 'react';
import { Breadcrumbs, Grid, Typography, Link, CircularProgress, Alert, Box } from '@mui/material';
import { GRID_COMMON_SPACING } from 'config';
import PropertyDescription from './PropertyDescription';
import PropertyAmenities from './PropertyAmenities';
import ContactInfo from './ContactInfo';
import PropertyDetailsCard from './PropertyDetailsCard';
import PropertyImages from './PropertyImages';
import { GET_PROPERTY } from 'graphql/propertyQueries';
import { useQuery } from '@apollo/client/react';

export default function PropertyDetails({ onClose, property }) {
  const [propertyData, setPropertyData] = useState(property || {});

  // GraphQL query to fetch detailed property data
  const { data, loading, error, refetch } = useQuery(GET_PROPERTY, {
    variables: { propertyId: property?.id },
    skip: !property?.id, // Skip query if no propertyId
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  // Update propertyData when API data is received
  useEffect(() => {
    if (data?.getProperty?.success && data?.getProperty?.data) {
      const apiPropertyData = data.getProperty.data;
      // Transform API data to match expected format
      const transformedProperty = {
        id: apiPropertyData.id,
        name: apiPropertyData.title || 'N/A',
        title: apiPropertyData.title || 'N/A',
        description: apiPropertyData.description || 'N/A',
        address: apiPropertyData.address || 'N/A',
        city: apiPropertyData.city || 'N/A',
        state: apiPropertyData.state || 'N/A',
        district: apiPropertyData.district || 'N/A',
        zipCode: apiPropertyData.zipCode || 'N/A',
        country: apiPropertyData.country || 'N/A',
        category: apiPropertyData.category || 'N/A',
        condition: apiPropertyData.condition || 'N/A',
        seoOptimized: apiPropertyData.seoOptimized || false,
        phoneNumber: apiPropertyData.phoneNumber || 'N/A',
        totalFloors: apiPropertyData.totalFloors || 'N/A',
        floorNumber: apiPropertyData.floorNumber || 'N/A',
        parkingSpots: apiPropertyData.parkingSpots || 'N/A',
        bathrooms: apiPropertyData.bathrooms || 'N/A',
        firstName: apiPropertyData.firstName || 'N/A',
        lastName: apiPropertyData.lastName || 'N/A',
        email: apiPropertyData.email || 'N/A',
        price: apiPropertyData.price ? `$${apiPropertyData.price}` : 'N/A',
        propertyType: apiPropertyData.propertyType || 'N/A',
        bedrooms: apiPropertyData.bedrooms || 'N/A',
        squareFeet: apiPropertyData.squareFeet || '',
        lotSize: apiPropertyData.lotSize || 'N/A',
        yearBuilt: apiPropertyData.yearBuilt || 'N/A',
        amenities: apiPropertyData.amenities || [],
        images: apiPropertyData.images || [],
        status: apiPropertyData.status || 'N/A',
        approvalStatus: apiPropertyData.approvalStatus || 'N/A',
        isFeatured: apiPropertyData.isFeatured || false,
        viewsCount: apiPropertyData.viewsCount || 0,
        visitsCount: apiPropertyData.visitsCount || 0,
        createdAt:
          apiPropertyData.createdAt && apiPropertyData.createdAt.trim()
            ? (() => {
                try {
                  return new Date(apiPropertyData.createdAt).toLocaleDateString();
                } catch (e) {
                  return apiPropertyData.createdAt;
                }
              })()
            : 'N/A',
        updatedAt:
          apiPropertyData.updatedAt && apiPropertyData.updatedAt.trim()
            ? (() => {
                try {
                  return new Date(apiPropertyData.updatedAt).toLocaleDateString();
                } catch (e) {
                  return apiPropertyData.updatedAt;
                }
              })()
            : 'N/A',
        approvedAt:
          apiPropertyData.approvedAt && apiPropertyData.approvedAt.trim()
            ? (() => {
                try {
                  return new Date(apiPropertyData.approvedAt).toLocaleDateString();
                } catch (e) {
                  return apiPropertyData.approvedAt;
                }
              })()
            : 'N/A',
        approvedBy: apiPropertyData.approvedBy || 'N/A',
        visits: apiPropertyData.visits || [],
      };
      setPropertyData(transformedProperty);
    }
  }, [data]);

  // Show loading state
  if (loading && !propertyData?.id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography ml={2}>Loading property details for {property?.name || 'property'}...</Typography>
      </Box>
    );
  }

  // Show message if no property data
  if (!propertyData?.id && !loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="textSecondary">
          No property data available
        </Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">Error loading property details: {error.message}</Alert>
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
          Properties
        </Link>
        <Typography color="text.primary">{propertyData.name || 'Property Details'}</Typography>
      </Breadcrumbs>

      <Grid container spacing={GRID_COMMON_SPACING}>
        {/* row 1 */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyImages property={propertyData} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyDetailsCard property={propertyData} />
        </Grid>
        {/* row 2 */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyDescription property={propertyData} />
        </Grid>
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyAmenities property={propertyData} />
        </Grid>
        {/* row 3 */}
        <Grid item size={12}>
          <ContactInfo property={propertyData} />
        </Grid>
      </Grid>
    </>
  );
}
