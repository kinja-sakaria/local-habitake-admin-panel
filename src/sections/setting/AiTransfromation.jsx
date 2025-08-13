import { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// List of settings
const settingsList = [
  'Remove low quality Images',
  'AI Image Generation',
  'Download the AI transform image',
  'Like',
  'Comment',
  'Share',
  'Chat & Messaging System',
  'Paid Advertising',
  'Custom AI Styling Region',
];

export default function AiTransfromation() {
  const [toggles, setToggles] = useState(settingsList.reduce((acc, key) => ({ ...acc, [key]: true }), {}));

  const handleToggleChange = (label) => {
    setToggles((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      <Typography variant="h5" mb={3}>
        AI TRANSFORMATION
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        {settingsList.map((label) => (
          <Grid key={label} size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography color="secondary.main" sx={{ fontWeight: 500, fontSize: '17.3px' }}>
                {label}
              </Typography>
              <label className="switch">
                <input type="checkbox" checked={toggles[label]} onChange={() => handleToggleChange(label)} />
                <span className="slider round"></span>
              </label>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
