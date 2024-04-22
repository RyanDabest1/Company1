import { Grid, Typography, Button, Box } from '@mui/material';
import HeroBack from '../assets/Hero/HeroBack.jpg'
import { keyframes } from '@emotion/react'; // Import keyframes from emotion/react
import { styled } from "@mui/material/styles";
import Hero from "../assets/Hero/Hero.jpg"
const moveInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const WhiteContainer = styled('div')({
  background: 'rgba(255, 255, 255, 0.2)',
  padding: '20px', // Add padding as needed
  borderRadius: '10px', // Add border radius as needed
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  color : 'white'

});

function HeroSection() {

    
  return (
    <Grid container spacing={3} alignItems="center">
      {/* Image on the left */}
      <Grid item xs={12} md={6}>
        <div className="imghvr-flip-vert bg-white" style={{ borderRadius: '10px',   maxWidth: '91%', width: '100%' }}>
          {/* Add the class for flip-vert effect */}
          <img
            src={Hero}
            alt="Hero Image"
            style={{ width: '100%', height: 'auto', borderRadius: '10px',  maxWidth: '100%' }}
          />
          <figcaption className='!bg-white' style={{ borderRadius: '10px' }}>
            <img
              src={HeroBack}
              alt="Hero Back Image"
              style={{ width: '100%', height: 'auto', borderRadius: '10px',  maxWidth: '100%' }}
            />
          </figcaption>
        </div>
      </Grid>

      {/* Text content on the right */}
      <Grid item xs={12} md={6}>
        <WhiteContainer>
        <Box
          sx={{
            color: 'black',
            padding: '5px',
            borderRadius: '10px',
            animation: `${moveInFromRight} 1s ease-in-out`, // Apply the animation
          }}
        >
          <Typography variant="h4">Welcome Back!</Typography>

          <Typography variant="body1" paragraph>
            Start managing your data!
          </Typography>
          <Typography variant="body1" paragraph>
            Analyze and create spreadsheets with ease.
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Box>
        </WhiteContainer>
      </Grid>
    </Grid>
  );
}

export default HeroSection;
