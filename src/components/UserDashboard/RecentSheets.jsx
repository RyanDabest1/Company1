import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import { getRecentSheets, assignCurrentCalculation } from '../../functions/funct';
import { useNavigate } from 'react-router-dom';
let userId;

export default function RecentSheetsCard() {
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);
      const [recentSheets, setRecentSheets] = useState([]);
    
  useEffect(() => {
    userId = JSON.parse(localStorage.getItem("User")).id;
    async function startUp(userId){
      let res = await getRecentSheets(userId);
      let sheets = await res.sheets;
      setRecentSheets(sheets);
      console.log(recentSheets)
      setLoading(false)
      
    }
    startUp(userId)
  },[])
  return (
    <Card sx={{ maxWidth: 360 }}>
 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Recent Sheets : 
        </Typography>
        { loading ? (<></>) : (
          recentSheets.map(sheet => (
        <Chip label={sheet.sheetName} variant="outlined" onClick={() => {assignCurrentCalculation(sheet._id); navigate("/Calculate")}} />
       )))}
      </CardContent>
    </Card>
  );
}