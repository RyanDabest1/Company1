import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { assignCurrentCalculation } from '../../functions/funct';
import { useNavigate } from 'react-router-dom';
import { deleteMergedSheet } from '../../functions/funct';
import { useEffect, useState } from 'react';
let userId;

function SheetCard({startDate, endDate , id}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userId = localStorage.getItem("userId")
    console.log(userId)
    setLoading(false);
  }, [])

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
        { loading ? <>Loading..</> : (
          <>
        <Button variant="contained" color="primary" id={id} onClick={ async () => { await assignCurrentCalculation(id); navigate("/MergedView") }}>View</Button>
        <Button variant="contained" style={{ marginLeft: '8px' }} id={id} color="error" onClick={async() => { if(await deleteMergedSheet(id,userId)  ){
          window.location.reload();
        }}}>Delete</Button>
        </>
      )}
      </CardContent>
    </Card>
  );
}

export default SheetCard;