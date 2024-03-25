import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { assignCurrentCalculation } from '../../functions/funct';

function SheetCard({sheetName, id}) {
  return (
    <Card sx={{ maxWidth: 300, margin: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {sheetName}
        </Typography>
        <Button variant="contained" style={{ marginRight: '8px' }}>Show Data</Button>
        <Button variant="contained" color="primary" id={id} onClick={() => {assignCurrentCalculation(id)}} href='/Calculate'>Calculate</Button>
      </CardContent>
    </Card>
  );
}

export default SheetCard;