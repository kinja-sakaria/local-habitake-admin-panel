import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { ArrowUp } from 'iconsax-reactjs';

// chart options
const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 320
  },
  labels: ['Advertising Revenue', 'Subscription Plans', 'Listing Fees', 'Sales Commission'],
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| CHART ||============================== //

function ApexDonutChart() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const mode = theme.palette.mode;

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.secondary[200];
  const backColor = theme.palette.background.paper;

  const [series] = useState([60, 60, 23, 20]);
  const [options, setOptions] = useState(pieChartOptions);

  useEffect(() => {
    const primaryMain = theme.palette.revenue.light;
    const primaryLighter = theme.palette.revenue.lighter;
    const warning = theme.palette.revenue.main;
    const success = theme.palette.revenue.dark;

    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, warning, success, primaryLighter],
      xaxis: {
        labels: {
          style: { colors: primary }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      stroke: {
        colors: [backColor]
      },
      theme: {
        mode: 'light'
      }
    }));
  }, [mode, primary, line, grey200, backColor, theme]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" height={downSM ? 280 : 320} id="total-income-chart" />
    </div>
  );
}

// ==============================|| CHART WIDGETS - TOTAL INCOME ||============================== //

export default function TotalIncome() {
  return (
    <MainCard>
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={12}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">Total Income</Typography>
          </Stack>
        </Grid>
        <Grid size={12} sx={{ '.apexcharts-active': { color: 'common.white' } }}>
          <ApexDonutChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
            <Stack sx={{ gap: 0.5, alignItems: 'flex-start', p: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Dot componentDiv sx={{ bgcolor: 'revenue.main' }} />
                <Typography>Subscription Plans</Typography>
              </Stack>

              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                $23,876
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.25 }}
                >
                  <ArrowUp size={14} /> +$76,343
                </Typography>
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
            <Stack sx={{ gap: 0.5, alignItems: 'flex-start', p: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Dot componentDiv sx={{ bgcolor: 'revenue.light' }} />
                <Typography>Advertising Revenue</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                $23,876
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.25 }}
                >
                  <ArrowUp size={14} /> +$76,343
                </Typography>
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
            <Stack sx={{ gap: 0.5, alignItems: 'flex-start', p: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Dot componentDiv sx={{ bgcolor: 'revenue.lighter' }} />
                <Typography>Sales Commission</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                $23,876
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.25 }}
                >
                  <ArrowUp size={14} /> +$76,343
                </Typography>
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
            <Stack sx={{ gap: 0.5, alignItems: 'flex-start', p: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <Dot componentDiv sx={{ bgcolor: 'revenue.dark' }} />
                <Typography>Listing Fees</Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                $23,876
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.25 }}
                >
                  <ArrowUp size={14} /> +$76,343
                </Typography>
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}
