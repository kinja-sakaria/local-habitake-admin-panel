import { useState } from 'react';
import { Button, CardMedia, Grid, IconButton, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

export default function AfterAITransformation() {
  const [selected, setSelected] = useState(0);
  const [like, setLike] = useState(null);
  const [comment, setComment] = useState('');

  const buttons = ['Good Output', 'Need Improvement', 'Failed Generation'];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Title */}
      <Typography fontSize={{ xs: '16px', sm: '19.77px' }} fontWeight={500} color="secondary.800" mb={2}>
        After AI Transformation
      </Typography>

      {/* Image */}
      <CardMedia
        component="img"
        image="/assets/images/users/property-img.png"
        alt="After AI Transformation"
        sx={{
          borderRadius: '12px',
          width: '100%',
          height: isMobile ? 200 : 342,
          objectFit: 'cover',
        }}
      />

      {/* Success Status */}
      <Typography fontSize={{ xs: '15px', sm: '17.3px' }} fontWeight={500} mt={4} mb="17.3px" color="secondary.main">
        Success Status
      </Typography>

      {/* Status Buttons */}
      <Grid item xs={12} container spacing={2} mb={3}>
        {buttons.map((label, index) => {
          const isSelected = selected === index;
          return (
            <Grid item xs={12} sm={4} key={label}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setSelected(index)}
                sx={{
                  borderRadius: '100px',
                  textTransform: 'none',
                  fontSize: { xs: '14px', sm: '16px' },
                  backgroundColor: isSelected ? 'success.main' : 'rgba(230, 230, 234, 0.5)',
                  color: isSelected ? '#fff' : '#000',
                  '&:hover': {
                    backgroundColor: isSelected ? 'success.dark' : 'rgba(230, 230, 234, 0.7)',
                  },
                }}
              >
                {label}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {/* Thumbs + Comment */}
      <Stack spacing={1}>
        <Typography fontSize={{ xs: '15px', sm: '17.3px' }} fontWeight={500} color="secondary.main">
          Thumbs
        </Typography>

        <Stack direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'stretch' : 'center'} spacing={1}>
          {/* Thumbs Up */}
          <IconButton
            onClick={() => setLike('up')}
            sx={{
              color: like === 'up' ? '#4680FF' : '#B0B3BD',
              transition: 'color 0.2s',
              '& svg': { width: '28px', height: '28px' },
              alignSelf: isMobile ? 'flex-start' : 'center',
            }}
          >
            {like === 'up' ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
          </IconButton>

          {/* Thumbs Down */}
          <IconButton
            onClick={() => setLike('down')}
            sx={{
              color: like === 'down' ? '#4680FF' : '#B0B3BD',
              transition: 'color 0.2s',
              '& svg': { width: '28px', height: '28px' },
              alignSelf: isMobile ? 'flex-start' : 'center',
            }}
          >
            {like === 'down' ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />}
          </IconButton>

          {/* Comment Field */}
          <TextField
            variant="outlined"
            placeholder="Comment (optional)"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '100px',
              },
              width: isMobile ? '100%' : 'auto',
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
