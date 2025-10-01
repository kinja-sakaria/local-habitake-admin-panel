import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const PropertyDescription = ({ property }) => {
    return (
        <>
            {/* Left Side: Images */}
            <MainCard
                sx={{
                    padding: '40px',
                    '& .MuiCardContent-root': {
                        padding: '0',
                    },
                }}
            >
                <Typography variant="h3" color="info.100" mb="10px">
                    Description
                </Typography>
                <Typography variant="h5" fontWeight={500} color="#8A8E9D">
                    {property?.description}
                </Typography>
            </MainCard>
        </>
    );
};

export default PropertyDescription;
