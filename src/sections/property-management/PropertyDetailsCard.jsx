import { Box, Typography, Chip, Grid, Divider } from '@mui/material';

import { LocationFillIcon } from '../../components/asstes';

const PropertyDetailsCard = () => {
  const features = [
    { label: 'Bedroom', key: 'bedroom', paddingLeft: true, value: '02', icon: '/assets/images/property-details/bed.svg' },
    { label: 'Bathroom', key: 'bathroom', paddingLeft: true, value: '02', icon: '/assets/images/property-details/Bathtub.svg' },
    { label: 'Parking', key: 'parking', paddingLeft: true, value: '02', icon: '/assets/images/property-details/parking-spots.svg' },
    { label: 'Views', key: 'views', paddingLeft: true, value: '02', icon: '/assets/images/property-details/property-views.svg' },
  ];

  return (
    <>
      <Typography fontSize="36px" fontWeight={600} color="info.100">
        Seaside Serenity Villa
      </Typography>

      <Chip
        label="Malibu, California"
        variant="outlined"
        icon={<LocationFillIcon />}
        sx={{
          mt: 2.5,
          borderRadius: '16px',
          fontWeight: 500,
          borderColor: 'success.main',
          color: 'info.100',
          fontSize: '14px',
        }}
      />

      <Typography variant="h6" color="#8A8E9D" sx={{ mt: 2.5 }}>
        SEO-optimized Status
      </Typography>
      <Typography variant="h4" fontWeight={600} color="info.100">
        Private
      </Typography>

      <Typography variant="h6" color="#8A8E9D" sx={{ mt: 2.5, fontWeight: 500 }}>
        Price
      </Typography>
      <Typography fontSize="28px" fontWeight={600} color="info.100" mb={2.5}>
        $1,250,000
      </Typography>
      <Divider color="#B0B3BD" />
      {/* Property Info */}
      <Grid container mt={2.5}>
        {features.map((item, index) => (
          <Grid
            key={item.key}
            item
            size={{ xs: 6, sm: 3, md: 3, lg: 3 }}
            sx={{
              borderRight: { xs: 'none', sm: index !== features.length - 1 ? '1px solid #B0B3BD' : 'none' },
              pr: 2,
              pl: { xs: 0, sm: index > 0 ? 2 : 0 },
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <img src={item.icon} alt={item.label} />
              <Typography variant="h6" fontWeight={500} color="#B0B3BD">
                {item.label}
              </Typography>
            </Box>
            <Typography variant="subtitle3" fontWeight={500}>
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PropertyDetailsCard;
