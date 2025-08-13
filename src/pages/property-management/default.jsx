// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import { GRID_COMMON_SPACING } from 'config';
import MainCard from 'components/MainCard';

import EcommerceDataChart from 'sections/dashboard/default/EcommerceDataChart';
import TotalIncome from 'sections/dashboard/default/TotalIncome';
import RepeatCustomerRate from 'sections/dashboard/default/RepeatCustomerRate';

// assets
import { ArrowDown, ArrowUp, User } from 'iconsax-reactjs';

import imgActiveProperty from 'assets/images/icons/active-property.svg';
import imgTotalProperty from 'assets/images/icons/total-property.svg';
import imgTotalUser from 'assets/images/icons/total-user.svg';
import VerificationTabs from '../../sections/dashboard/default/VerificationTabs';
import ActionButtons from '../../sections/dashboard/default/ActionButtons';
import VerificationTable from '../../sections/dashboard/default/VerificationTable';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const theme = useTheme();
  const [tab, setTab] = useState(1);
  const handleApproveAll = () => {
    alert('Approved all');
  };

  const handleRejectAll = () => {
    alert('Rejected all');
  };

  const handleViewAll = () => {
    alert('View all clicked');
  };
  return (
    <>
      <Grid container spacing={GRID_COMMON_SPACING}>
        {/* row 1 */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Total User"
            count="3000"
            color="primary"
            iconPrimary={<img src={imgTotalUser} alt="total-user" />}
            percentage={
              <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.primary.dark} />
          </EcommerceDataCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Active User"
            count="290"
            color="success"
            iconPrimary={<User color="#01A669" variant="Bold" />}
            percentage={
              <Typography sx={{ color: 'success.darker', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.success.darker} />
          </EcommerceDataCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Total Property"
            count="1,568"
            sx={{ bgcolor: ' rgba(0, 9, 41, 0.2)' }}
            iconPrimary={<img src={imgTotalProperty} alt="total-property" />}
            percentage={
              <Typography sx={{ color: 'info.100', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.info[100]} />
          </EcommerceDataCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <EcommerceDataCard
            title="Active Property"
            count="200"
            sx={{ bgcolor: 'rgba(52, 33, 107, 0.2)' }}
            iconPrimary={<img src={imgActiveProperty} alt="active-property" />}
            percentage={
              <Typography sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.primary.main} />
          </EcommerceDataCard>
        </Grid>
        {/* row 2 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <RepeatCustomerRate />
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <TotalIncome />
        </Grid>
        {/* row 3 */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <MainCard>
            <Typography variant="h5" mb={3}>
              {' '}
              Verification Management
            </Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid #E8EBEE' }}>
              <VerificationTabs activeTab={tab} onChange={(e, val) => setTab(val)} userCount={10} propertyCount={10} />
              <ActionButtons onApproveAll={handleApproveAll} onRejectAll={handleRejectAll} onViewAll={handleViewAll} />
            </Stack>
            <Box mt={3}>
              <VerificationTable />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
