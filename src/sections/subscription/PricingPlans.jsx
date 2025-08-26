import { useState } from 'react';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import { Box, Card, Checkbox, Grid, Typography, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState('Standard');

  const [features, setFeatures] = useState([
    { text: 'Lorem ipsum dolor', available: true },
    { text: 'Lorem ipsum dolor sit amet consectetur', available: true },
    { text: 'Lorem ipsum dolor sit amet', available: true },
    { text: 'Lorem ipsum dolor', available: true },
    { text: 'Lorem ipsum dolor sit', available: false },
    { text: 'Lorem ipsum dolor sit amet', available: false },
    { text: 'Lorem ipsum dolor', available: false },
  ]);

  const plans = [
    { name: 'Basic', price: 69, services: 2 },
    { name: 'Standard', price: 129, services: 4 },
    { name: 'Premium', price: 599, services: 7 },
  ];
  const handleToggleFeature = (index) => {
    const updated = [...features];
    updated[index].available = !updated[index].available;
    setFeatures(updated);
  };

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Features List */}
      <Grid item size={{ xs: 12, md: 6, lg: 7 }}>
        <MainCard>
          <List disablePadding>
            {features.map((feature, index) => (
              <ListItem
                key={index}
                sx={{
                  pl: 0,
                  pr: 0,
                  opacity: feature.available ? 1 : 0.8,
                  width: '100%',
                  borderBottom: '1px solid #E8EBEE',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={feature.available}
                    onChange={() => handleToggleFeature(index)}
                    icon={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '6px',
                          backgroundColor: '#E0E0E0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 12, height: 12 }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </Box>
                    }
                    checkedIcon={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '6px',
                          backgroundColor: '#01A669',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 12, height: 12 }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </Box>
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={feature.text}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: feature.available ? 500 : 400,
                    color: feature.available ? '#5B6B79' : '#DBDBDB',
                  }}
                  sx={{
                    textDecoration: feature.available ? 'none' : 'line-through',
                    textDecorationColor: feature.available ? '' : '#DBDBDB',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </MainCard>
      </Grid>

      {/* Plans */}
      <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
        <MainCard>
          <Stack spacing="22px">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <Card
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    border: isSelected ? 'none' : '1px solid #E8EBEE',
                    boxShadow: 'none',
                    backgroundColor: isSelected ? 'rgba(1, 166, 105, 0.1)' : 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox checked={isSelected} color="success" />}
                    label={
                      <Box>
                        <Typography variant="h5" fontWeight={400} color={isSelected ? '#000000' : 'secondary.main'}>
                          {plan.name}
                        </Typography>
                        <Typography variant="caption" fontWeight={300} pt={2} color={isSelected ? '#000000' : 'secondary.main'}>
                          0{plan.services} Services
                        </Typography>
                      </Box>
                    }
                  />
                  <Box display="flex" alignItems="flex-end">
                    <Typography fontWeight={700} variant="h5" mb="2px" color={isSelected ? '#000000' : 'secondary.main'}>
                      ${plan.price}
                    </Typography>
                    <Typography component="span" fontSize={12} fontWeight={400} color={isSelected ? '#9F9F9F' : 'secondary.main'}>
                      /month
                    </Typography>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
