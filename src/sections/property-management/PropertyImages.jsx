import { Box, Chip, CardMedia } from '@mui/material';

import { useState } from 'react';

const PropertyImages = () => {
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/users/property-img.png');

  const thumbnails = [
    '/src/assets/images/property-details/living-room1.png',
    '/src/assets/images/property-details/living-room2.png',
    '/src/assets/images/property-details/living-room3.png',
    '/src/assets/images/property-details/living-room4.png'
  ];

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="320"
          image={selectedImage}
          alt="Seaside Serenity Villa"
          sx={{ borderRadius: '12px', height: '100%', maxHeight: '351px' }}
        />
        <Chip
          label="Cover"
          color="default"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#fff',
            fontWeight: 500,
            fontSize: '12px',
            borderRadius: '8px',
            color: '#333A54'
          }}
        />
      </Box>

      {/* Thumbnails */}
      <Box display="flex" gap={1.5} mt={2}>
        {thumbnails.map((src, i) => (
          <CardMedia
            key={i}
            component="img"
            image={src}
            alt={`Thumbnail ${i}`}
            sx={{
              borderRadius: '4px',
              cursor: 'pointer',
              height: '42px',
              width: '62px'
            }}
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </Box>
    </>
  );
};

export default PropertyImages;
