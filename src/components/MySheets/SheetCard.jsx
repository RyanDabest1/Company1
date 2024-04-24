import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { assignCurrentCalculation, deleteSheet } from '../../functions/funct';
import { useEffect, useState } from 'react';
let userId;
function SheetCard({sheetName, id}) {
 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userId = localStorage.getItem("userId")
    console.log(userId)
    setLoading(false);
  }, [])
  return (
    <Card sx={{ maxWidth: 450, margin: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {sheetName}
        </Typography>
        { loading? <>Loading</> : (
          <>
        <Button variant="contained" style={{ marginRight: '8px' }}>Show Data</Button>
        <Button variant="contained" color="primary" id={id} onClick={() => {assignCurrentCalculation(id, userId)}} href='/Calculate'>Calculate</Button>
        <Button variant="contained" style={{ marginLeft: '8px' }} id={id} color="error" onClick={async() => { if( await deleteSheet(id, userId)){
          window.location.reload();
        }}}>Delete</Button>
        </>
        )}
      </CardContent>
    </Card>
  );
}

export default SheetCard;