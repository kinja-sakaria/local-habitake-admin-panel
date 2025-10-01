import { Stack, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ActionButtons({ activeTab, onTabChange, approvalCounts, pendingCounts }) {
    const { t } = useTranslation();

    const tabs = [
        { id: 0, label: t('properties.approvedProperties'), count: approvalCounts },
        { id: 1, label: t('properties.pendingApproval'), count: pendingCounts },
    ];

    return (
        <Stack direction="row" spacing={4}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <Box
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            borderBottom: isActive ? '2px solid #16a34a' : '2px solid transparent',
                            pb: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? 'success.main' : 'text.secondary',
                            }}
                        >
                            {tab.label}
                        </Typography>
                        <Box
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '100%',
                                bgcolor: isActive ? '#D9F2E9' : '#E7E9EB',
                                color: isActive ? 'success.main' : 'secondary.main',
                            }}
                        >
                            {tab.count}
                        </Box>
                    </Box>
                );
            })}
        </Stack>
    );
}
