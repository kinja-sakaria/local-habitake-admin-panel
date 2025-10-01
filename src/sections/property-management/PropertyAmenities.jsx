import { Grid, Typography, Divider } from '@mui/material';
import MainCard from 'components/MainCard';

const PropertyAmenities = ({ property }) => {
  const propertyDetails = [
    { label: 'Property Type', value: property?.propertyType },
    { label: 'Category', value: property?.category },
    { label: 'Condition', value: property?.condition },
  ];

  const floorDetails = [
    { label: 'Total Floors', value: property?.totalFloors },
    { label: 'Floor Number', value: property?.floorNumber },
    { label: 'Area', value: property?.squareFeet ? `${property?.squareFeet} sq. ft` : '-' },
  ];

  return (
    <>
      <MainCard
        sx={{
          padding: '40px',
          '& .MuiCardContent-root': {
            padding: 0,
          },
        }}
      >
        {/* Title */}
        <Typography variant="h3" color="info.100" mb="10px">
          Amenities
        </Typography>

        {/* Amenities List */}
        <Grid container columnSpacing={{ xs: 2, md: 3 }} rowSpacing="22px" columns={{ xs: 4, sm: 8, md: 12 }}>
          {property?.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 ? (
            property.amenities.map((item, index) => (
              <Grid item size={{ xs: 2, sm: 6, md: 6 }} key={index}>
                <Typography variant="h5" fontWeight={400} color="info.100" style={{ whiteSpace: 'nowrap' }}>
                  • {item}
                </Typography>
              </Grid>
            ))
          ) : (
            <Grid item size={12}>
              <Typography variant="h5" fontWeight={400} color="info.100">
                No amenities available
              </Typography>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ mt: '28px', mb: '20px' }} color="#B0B3BD" />

        {/* Property Details */}
        <Grid container spacing={2} justifyContent="space-between">
          {propertyDetails.map((detail, index) => (
            <Grid
              item
              size={{ xs: 4, sm: 4, md: 4 }}
              key={index}
              sx={{
                borderLeft: index !== 0 ? '1px solid #B0B3BD' : 'none',
                paddingX: index !== 0 ? 2 : 0,
              }}
            >
              <Typography variant="h6" fontWeight={500} color="#B0B3BD">
                {detail.label}
              </Typography>
              <Typography variant="subtitle3" fontWeight={500}>
                {detail.value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: '28px', mb: '20px' }} color="#B0B3BD" />

        {/* Floor Details */}
        <Grid container spacing={2} justifyContent="space-between">
          {floorDetails.map((detail, index) => (
            <Grid
              item
              size={{ xs: 4, sm: 4, md: 4 }}
              key={index}
              sx={{
                borderLeft: index !== 0 ? '1px solid #B0B3BD' : 'none',
                paddingX: index !== 0 ? 2 : 0,
              }}
            >
              <Typography variant="h6" fontWeight={500} color="#B0B3BD">
                {detail.label}
              </Typography>
              <Typography variant="subtitle3" fontWeight={500}>
                {detail.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </>
  );
};

export default PropertyAmenities;
