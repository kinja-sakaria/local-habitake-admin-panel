import { Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

export default function ContactInfo({ property }) {
  return (
    <>
      <MainCard border={false} sx={{ boxShadow: '0px 0px 20px 0px rgba(12, 37, 65, 0.1)' }}>
        {/* Title */}
        <Typography variant="h3" color="info.100" mb="20px">
          Contact Info
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {[
            { label: 'Full Name', value: `${property?.firstName || ''} ${property?.lastName || ''}`.trim() || 'N/A' },
            { label: 'Email', value: property?.email || 'N/A' },
            { label: 'Phone Number', value: property?.phoneNumber || 'N/A' },
          ].map((field, index) => (
            <Grid key={index} item size={{ xs: 12, sm: 4, md: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '100%',
                    color: 'info.100',
                  }}
                >
                  {field.label}
                </InputLabel>
                <OutlinedInput
                  value={field.value}
                  fullWidth
                  disabled
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    backgroundColor: '#F5F5F7',
                    '& input.Mui-disabled': {
                      color: (theme) => theme.palette.info[100], // ✅ Correct target
                      WebkitTextFillColor: (theme) => theme.palette.info[100], // ✅ Safari/Chrome
                    },
                  }}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </>
  );
}
