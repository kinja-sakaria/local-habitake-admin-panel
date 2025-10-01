import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, CardMedia, Grid, Rating, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import TransformationTypeModal from 'components/modal/TransformationTypeModal';

export default function BeforeAITransformation() {
  const [value, setValue] = useState(4);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [newButton, setNewButton] = useState('');
  const [buttons, setButtons] = useState(['Modern', 'Classic', 'Industrial', 'Minimalist']);

  const handleAddButton = () => {
    if (newButton.trim()) {
      setButtons([...buttons, newButton.trim()]);
      setNewButton('');
      setOpen(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // true on small screens

  return (
    <>
      {/* Title */}
      <Typography fontSize={{ xs: '16px', sm: '19.77px' }} fontWeight={500} color="secondary.800" mb={2}>
        Before AI Transformation
      </Typography>

      {/* Image */}
      <CardMedia
        component="img"
        image="/assets/images/users/property-img.png"
        alt="Before AI Transformation"
        sx={{
          borderRadius: '12px',
          width: '100%',
          height: isMobile ? 200 : 342,
          objectFit: 'cover',
        }}
      />

      {/* Transformation Type */}
      <Typography fontSize={{ xs: '15px', sm: '17.3px' }} fontWeight={500} mt={4} mb="17.3px" sx={{ color: 'secondary.main' }}>
        Transformation Type
      </Typography>

      {/* Buttons */}
      <Grid item xs={12} container spacing={2} mb={3}>
        {buttons.map((label, index) => (
          <Grid item xs={12} sm={4} key={label}>
            <Button
              key={label}
              variant="contained"
              onClick={() => setSelected(index)}
              sx={{
                borderRadius: '100px',
                textTransform: 'none',
                fontSize: { xs: '14px', sm: '16px' },
                px: { xs: 2, sm: 3 },
                py: { xs: 0.5, sm: 1 },
                backgroundColor: selected === index ? 'success.main' : 'rgba(230, 230, 234, 0.5)',
                color: selected === index ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: selected === index ? 'success.dark' : 'rgba(230, 230, 234, 0.7)',
                },
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}

        {/* Plus Button */}
        <Button
          variant="contained"
          // onClick={() => setSelected(buttons.length)}
          onClick={() => setOpen(true)}
          sx={{
            fontSize: { xs: '14px', sm: '16px' },
            borderRadius: '100px',
            textTransform: 'none',
            minWidth: '50px',
            px: { xs: 1, sm: 2 },
            backgroundColor: selected === buttons.length ? 'success.main' : 'rgba(230, 230, 234, 0.5)',
            '&:hover': {
              backgroundColor: selected === buttons.length ? 'success.dark' : 'rgba(230, 230, 234, 0.7)',
            },
          }}
        >
          <AddOutlinedIcon sx={{ color: selected === buttons.length ? '#fff' : '#000' }} />
        </Button>
      </Grid>

      {/* Rating */}
      <Stack spacing={1}>
        <Typography fontSize={{ xs: '15px', sm: '17.3px' }} fontWeight={500} color="secondary.main">
          Rating
        </Typography>
        <Rating
          name="user-rating"
          value={value}
          precision={1}
          size={isMobile ? 'medium' : 'large'}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          sx={{
            '& .MuiRating-iconFilled': { color: '#FFB400' },
            '& .MuiRating-iconEmpty': { color: '#C4C4C4' },
          }}
        />
      </Stack>
      <TransformationTypeModal
        open={open}
        handleClose={() => setOpen(false)}
        newButton={newButton}
        setNewButton={setNewButton}
        handleAddButton={handleAddButton}
      />
    </>
  );
}
