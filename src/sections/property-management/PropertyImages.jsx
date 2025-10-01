import { Box, Chip, CardMedia } from '@mui/material';

import { useState } from 'react';

const PropertyImages = ({ property }) => {
    // Use property images if available, otherwise fallback to default
    const propertyImages = property?.images && Array.isArray(property.images) && property.images.length > 0
        ? property.images
        : ['/assets/images/users/property-img.png'];

    const [selectedImage, setSelectedImage] = useState(propertyImages[0]);

    // const thumbnails = propertyImages.length > 1 ? propertyImages : [
    //     '/assets/images/property-details/living-room1.png',
    //     '/assets/images/property-details/living-room2.png',
    //     '/assets/images/property-details/living-room3.png',
    //     '/assets/images/property-details/living-room4.png',
    // ];

    const thumbnails = [
        '/assets/images/property-details/living-room1.png',
        '/assets/images/property-details/living-room2.png',
        '/assets/images/property-details/living-room3.png',
        '/assets/images/property-details/living-room4.png',
    ];

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="320"
                    image={selectedImage}
                    alt={property?.title || 'Property Image'}
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
                        color: '#333A54',
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
                            width: '62px',
                        }}
                        onClick={() => setSelectedImage(src)}
                    />
                ))}
            </Box>
        </>
    );
};

export default PropertyImages;
