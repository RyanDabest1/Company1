import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function GetProfitsCard() {
  return (
    <Card sx={{ maxWidth: 360 }}>
 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Get Profits
    
        </Typography>
 
      </CardContent>
    </Card>
  );
}