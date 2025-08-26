import { Grid, Typography, Divider } from '@mui/material';
import MainCard from 'components/MainCard';

const PropertyAmenities = () => {
  const amenities = ['TV set', 'Washing machine', 'Air conditioning', 'Separate workplace', 'Drying machine', 'Shower cabin'];

  const propertyDetails = [
    { label: 'Property Type', value: 'Residential' },
    { label: 'Category', value: 'Sell property' },
    { label: 'Condition', value: 'Secondary' },
  ];

  const floorDetails = [
    { label: 'Total Floors', value: '08' },
    { label: 'Floor Number', value: '03' },
    { label: 'Area', value: '2500 sq. ft' },
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
          {amenities.map((item, index) => (
            <Grid item size={{ xs: 2, sm: 4, md: 4 }} key={index}>
              <Typography variant="h5" fontWeight={400} color="info.100">
                • {item}
              </Typography>
            </Grid>
          ))}
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
