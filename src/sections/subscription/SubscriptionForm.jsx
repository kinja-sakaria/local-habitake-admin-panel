import { useState } from 'react';
import MainCard from 'components/MainCard';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Button, Grid, Typography, Breadcrumbs, Link, OutlinedInput, Stack, InputLabel, InputAdornment, IconButton } from '@mui/material';

export default function SubscriptionForm({ onCancel }) {
  const [features, setFeatures] = useState(['', '', '']);

  const handleAddFeature = () => setFeatures([...features, '']);
  const handleChangeFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  // ✅ delete a feature by index
  const handleDeleteFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Users
        </Link>
        <Typography color="text.primary">Subscription Form</Typography>
      </Breadcrumbs>

      <MainCard sx={{ margin: 'auto', width: '100%', maxWidth: '744px' }}>
        <Typography variant="subtitle3" fontWeight={500} color="secondary.800">
          Subscription
        </Typography>

        <Grid container spacing="24.72px" direction={'column'} mt={4}>
          <Grid item xs={12}>
            <Stack sx={{ gap: '14.83px' }}>
              <InputLabel
                sx={{
                  color: 'secondary.main',
                  fontSize: '17.3px',
                  fontWeight: 500,
                }}
              >
                Enter the title
              </InputLabel>
              <OutlinedInput
                type="text"
                name="title"
                placeholder="Enter title here"
                fullWidth
                sx={{ borderRadius: '100px', fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack sx={{ gap: '14.83px' }}>
              <InputLabel
                sx={{
                  color: 'secondary.main',
                  fontSize: '17.3px',
                  fontWeight: 500,
                }}
              >
                Enter price
              </InputLabel>
              <OutlinedInput
                type="text"
                name="price"
                placeholder="99.99"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        backgroundColor: "rgba(1, 166, 105, 0.1)",
                        borderRadius: "100px 0 0 100px",
                        height: "53px",
                        display: "flex",
                        alignItems: "center",
                        px: 2,                       
                      }}
                    >
                      <AttachMoneyIcon sx={{ fill: "#01A669" }} />
                    </Box>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "100px",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                    pl: 0, 
                  }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography fontSize="17.3px" color="secondary.main">
              Features
            </Typography>
            {features.map((feature, idx) => (
              <Box key={idx} display="flex" alignItems="center" mb="14.83px" gap={3}>
                <Typography color="secondary.main" fontSize="14.3px" fontWeight={400} sx={{ width: 80 }}>
                  Feature {idx + 1}
                </Typography>

                <OutlinedInput
                  type="text"
                  value={feature}
                  placeholder="Enter input here"
                  fullWidth
                  onChange={(e) => handleChangeFeature(idx, e.target.value)}
                  sx={{ borderRadius: '100px', fontSize: '18px', fontWeight: 400, lineHeight: '100%' }}
                />

                 {/* ✅ Delete Button */}
                <IconButton
                  onClick={() => handleDeleteFeature(idx)}
                  sx={{
                    color: 'error.main',
                    '&:hover': { bgcolor: 'rgba(255,0,0,0.1)' },
                  }}
                >
                  <DeleteIcon />
                </IconButton> 
              </Box>
            ))}
            <Box textAlign="end">
              <Button
                onClick={handleAddFeature}
                startIcon={<AddIcon />}
                sx={{
                  textTransform: 'none',
                  color: 'success.main',
                  textAlign: 'right',
                  '&:hover': { bgcolor: 'success.main', color: 'white' },
                }}
              >
                Add feature
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} mt='33.10px'>
            <Button onClick={onCancel} 
              sx={{
                color: "#747474",
                fontSize: "17.3px",
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#000000',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: "17.3px",
                fontWeight: 500,
                backgroundColor: 'primary.main',
                color: '#fff',
                borderRadius: '100px',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}
