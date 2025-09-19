// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import { GRID_COMMON_SPACING } from 'config';
import MainCard from 'components/MainCard';

import EcommerceDataChart from 'sections/dashboard/default/EcommerceDataChart';
import TotalIncome from 'sections/dashboard/default/TotalIncome';
import RepeatCustomerRate from 'sections/dashboard/default/RepeatCustomerRate';
import PropertyDetails from 'sections/property-management/PropertyDetails';

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
import { useTranslation } from 'react-i18next';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewUser = (user) => {
    navigate(tab === 1 ? '/property-management' : '', { state: { user, activeTab: tab } });
  };
  const handleCloseDetails = () => {
    setSelectedUser(null);
  };
  const handleApproveAll = () => {
    alert('Approved all');
  };

  const handleRejectAll = () => {
    alert('Rejected all');
  };

  const handleViewAll = () => {
    if (tab === 0) {
      navigate('/user-management');
    } else {
      navigate('/property-management');
    }
  };

  return (
    <>
      {selectedUser ? (
        <>
          <Typography variant="h3" color="#565F68" mb={3} sx={{ fontWeight: 500 }}>
            Property Details
          </Typography>
          <PropertyDetails user={selectedUser} onClose={handleCloseDetails} />
        </>
      ) : (
        <>
          <Grid container spacing={GRID_COMMON_SPACING}>
            {/* row 1 */}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <EcommerceDataCard
                title={t('dashboard.totalUsers')}
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
                title={t('dashboard.activeUsers')}
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
                title={t('dashboard.totalProperty')}
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
                  <VerificationTabs activeTab={tab} onChange={(e, val) => setTab(val)} userCount={6} propertyCount={6} />
                  <ActionButtons onApproveAll={handleApproveAll} onRejectAll={handleRejectAll} onViewAll={handleViewAll} />
                </Stack>
                <Box mt={3}>
                  <VerificationTable activeTab={tab} onViewUser={handleViewUser} />
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
