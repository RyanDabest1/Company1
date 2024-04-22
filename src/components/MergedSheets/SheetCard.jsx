import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { assignCurrentCalculation } from '../../functions/funct';
import { useNavigate } from 'react-router-dom';
function SheetCard({startDate, endDate , id}) {
  const navigate = useNavigate();
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const startDay = startDate.getUTCDate();
    const startMonth = startDate.getUTCMonth() + 1; // Months are zero-based (0 = January), so we add 1
    const startYear = startDate.getUTCFullYear(); 
    const simplifiedStart = `${startDay}-${startMonth}-${startYear}`;

    const endDay = endDate.getUTCDate();
    const endMonth = endDate.getUTCMonth() + 1; // Months are zero-based (0 = January), so we add 1
    const endYear = endDate.getUTCFullYear(); 
    const simplifiedEnd = `${endDay}-${endMonth}-${endYear}`;

  return (
    <Card sx={{ maxWidth: 400, margin: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
            ({simplifiedStart}) to ({simplifiedEnd})
        </Typography>
        <Button variant="contained" color="primary" id={id} onClick={ async () => { await assignCurrentCalculation(id); navigate("/MergedView") }}>View</Button>
      </CardContent>
    </Card>
  );
}

export default SheetCard;