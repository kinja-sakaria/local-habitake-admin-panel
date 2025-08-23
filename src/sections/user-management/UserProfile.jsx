import { Breadcrumbs, Link, Grid, Typography } from '@mui/material';
import { GRID_COMMON_SPACING } from 'config';
import StatusOverview from './StatusOverview';
import UserProfileCard from './UserProfileCard';
import PropertyListingTable from './PropertyListingTable';
import MainCard from 'components/MainCard';

export default function UserDetails({ user, onClose, activeTab }) {
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
        <Typography color="text.primary">{user.name || 'User Details'}</Typography>
      </Breadcrumbs>

      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <UserProfileCard user={user} activeTab={activeTab} />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 8 }}>
          <StatusOverview user={user} activeTab={activeTab} />
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid item size={12}>
          <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }}>
            <PropertyListingTable user={user} activeTab={activeTab} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
