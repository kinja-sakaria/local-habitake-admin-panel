import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const PropertyDescription = () => {
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
          Lorem ipsum dolor sit amet consectetur. Sem in commodo molestie consequat pulvinar a magna tortor. Pellentesque varius tincidunt
          magna iaculis mauris erat faucibus nunc. Tempus in nulla fermentum tincidunt et gravida lorem cursus non. Sed tristique et
          tristique non non.
        </Typography>
        <Typography variant="h5" fontWeight={500} color="#8A8E9D" mt="10px" pb="22px">
          Lorem ipsum dolor sit amet consectetur. Sem in commodo molestie consequat pulvinar a magna Lorem ipsum dolor sit amet consectetur.
          Sem in commodo molestie consequat pulvinar a magna Lorem ipsum dolor sit amet consectetur. Sem in commodo molestie consequat
          pulvinar a magna
        </Typography>
      </MainCard>
    </>
  );
};

export default PropertyDescription;
