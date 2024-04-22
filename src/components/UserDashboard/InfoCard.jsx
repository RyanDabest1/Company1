import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import {getCalculationDataInRange, mergeCalculation, saveMergedCalculation} from '../../functions/funct';
import { useNavigate } from 'react-router-dom';
let userId;
export default function InfoCard() {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);


    useEffect(() => {
    userId = localStorage.getItem("userId");
    }, [])
    return (
        <Card sx={{ width: '70%' }}>
            <CardContent>
                <Typography variant="h5" color="initial">
                    Search for sheets in the range
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '16px', marginTop : "13px" }}>
                        <label htmlFor="fromDate" className='m-2'>From:</label>
                        <Calendar
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => {setFromDate(e.value)
                                console.log("From date " + e.value) + typeof e.value
                            }}                           
                            dateFormat="yy/mm/dd"

                        />
                    </div>
                    <div>
                        <label htmlFor="toDate" className='m-2'>To:</label>
                        <Calendar
                            id="toDate"
                            value={toDate}
                            onChange={(e) => {setToDate(e.value)
                            }}
                            dateFormat="yy/mm/dd"

                        />
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={async () => {
                    if(fromDate && toDate){
                       let res = await getCalculationDataInRange(userId, fromDate, toDate)
                       console.log(res)
                       let mergedItems = mergeCalculation(res)
                       let res2 = await saveMergedCalculation(userId, mergedItems, fromDate, toDate)
                       navigate("/MergedSheets")
                    }
                }}>Search</Button>
            </CardActions>
        </Card>
    );
}
