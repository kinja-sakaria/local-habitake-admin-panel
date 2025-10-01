import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

// chart options
const pieChartOptions = {
    chart: {
        type: 'donut',
        height: 320,
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000',
                        offsetY: 10,
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#000',
                        offsetY: -10,
                    },
                    total: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000',
                        formatter: function (w) {
                            // sum all values to show 700
                            return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                        },
                    },
                },
            },
        },
    },
};

// ==============================|| CHART ||============================== //

function ApexDonutChart({ activeTab }) {
    const theme = useTheme();
    const { t } = useTranslation();
    const downSM = useMediaQuery(theme.breakpoints.down('sm'));

    const mode = theme.palette.mode;
    const { primary } = theme.palette.text;
    const line = theme.palette.divider;
    const grey200 = theme.palette.secondary[200];
    const backColor = theme.palette.background.paper;

    const [series, setSeries] = useState([60, 60, 23, 20]);
    const [options, setOptions] = useState(pieChartOptions);

    useEffect(() => {
        // Labels based on activeTab
        let labels = [];
        let totalLabel = t('userProfile.totalProperty');

        if (activeTab === 2) {
            labels = [
                t('userProfile.residential'),
                t('userProfile.rental'),
                t('userProfile.commercial'),
                t('userProfile.luxury')
            ];
            setSeries([350, 300, 30, 20]);
            totalLabel = t('userProfile.totalPropertyViewed');
        } else {
            labels = [
                t('userProfile.privateProperty'),
                t('userProfile.publicProperty'),
                t('userProfile.pendingProperty'),
                t('userProfile.approvedProperty')
            ];
            setSeries([350, 300, 30, 20]);
            totalLabel = t('userProfile.totalProperty');
        }

        // Update chart options
        setOptions((prevState) => ({
            ...prevState,
            labels,
            colors: [theme.palette.revenue.light, theme.palette.revenue.main, theme.palette.revenue.dark, theme.palette.revenue.lighter],
            plotOptions: {
                ...prevState.plotOptions,
                pie: {
                    ...prevState.plotOptions?.pie,
                    donut: {
                        ...prevState.plotOptions?.pie?.donut,
                        labels: {
                            ...prevState.plotOptions?.pie?.donut?.labels,
                            name: {
                                ...prevState.plotOptions?.pie?.donut?.labels?.name,
                                offsetY: 20,
                                breakword: true,
                            },
                            value: {
                                ...prevState.plotOptions?.pie?.donut?.labels?.value,
                                offsetY: -10,
                            },
                            total: {
                                ...prevState.plotOptions?.pie?.donut?.labels?.total,
                                label: totalLabel,
                            },
                        },
                    },
                },
            },
            xaxis: {
                labels: {
                    style: { colors: primary },
                },
            },
            yaxis: {
                labels: {
                    style: { colors: [primary] },
                },
            },
            grid: {
                borderColor: line,
            },
            stroke: {
                colors: [backColor],
            },
            theme: {
                mode: 'light',
            },
        }));
    }, [activeTab, mode, primary, line, grey200, backColor, theme]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="donut" height={downSM ? 280 : 320} id="total-income-chart" />
        </div>
    );
}
// ==============================|| CHART WIDGETS - TOTAL INCOME ||============================== //

export default function StatusOverview({ activeTab }) {
    const { t } = useTranslation();

    const stats = [
        activeTab === 2 ? { label: t('userProfile.residential'), value: 350, color: 'pink' } : { label: t('userProfile.publicProperty'), value: 350, color: 'pink' },
        activeTab === 2 ? { label: t('userProfile.rental'), value: 300, color: 'teal' } : { label: t('userProfile.privateProperty'), value: 300, color: 'teal' },
        activeTab === 2 ? { label: t('userProfile.commercial'), value: 30, color: 'orange' } : { label: t('userProfile.approvedProperty'), value: 30, color: 'orange' },
        activeTab === 2 ? { label: t('userProfile.luxury'), value: 20, color: 'goldenrod' } : { label: t('userProfile.pendingProperty'), value: 20, color: 'goldenrod' },
    ];

    return (
        <MainCard>
            <Grid size={12}>
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5">{t('userProfile.realEstateListingsStatusOverview')}</Typography>
                </Stack>
            </Grid>

            <Grid container spacing={2} pt="54px" pb="25px">
                <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                    {/* Donut Chart */}
                    <ApexDonutChart activeTab={activeTab} />
                </Grid>
                <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                    <Grid container rowSpacing={2} columnSpacing={GRID_COMMON_SPACING}>
                        {stats.map((item, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={index}>
                                <MainCard border={false} sx={{ bgcolor: 'background.default' }}>
                                    <Stack sx={{ gap: 0.5, alignItems: 'flex-start' }}>
                                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                                            <Dot componentDiv sx={{ bgcolor: item.color }} />
                                            <Typography>{item.label}</Typography>
                                        </Stack>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {item.value}
                                        </Typography>
                                    </Stack>
                                </MainCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}
