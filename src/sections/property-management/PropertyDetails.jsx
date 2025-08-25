import { Breadcrumbs, Grid, Typography, Link } from '@mui/material';
import { GRID_COMMON_SPACING } from 'config';
import PropertyDescription from './PropertyDescription';
import PropertyAmenities from './PropertyAmenities';
import ContactInfo from './ContactInfo';
import PropertyDetailsCard from './PropertyDetailsCard';
import PropertyImages from './PropertyImages';

export default function PropertyDetails({ onClose, user }) {
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
          Users
        </Link>
        <Typography color="text.primary">{user.name || 'Property Details'}</Typography>
      </Breadcrumbs>

      <Grid container spacing={GRID_COMMON_SPACING}>
        {/* row 1 */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyImages />
        </Grid>
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyDetailsCard />
        </Grid>
        {/* row 2 */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyDescription />
        </Grid>
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <PropertyAmenities />
        </Grid>
        {/* row 3 */}
        <Grid item size={12}>
          <ContactInfo />
        </Grid>
      </Grid>
    </>
  );
}
