import NavBar from '../components/HomePage/NavBar.jsx';
import { Stack, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getCalculationData, saveCalculationData, getSheetInfo } from '../functions/funct.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

let total = 0;
const Calculate = () => {
    const navigate = useNavigate();
    const [gridApi, setGridApi] = useState(null);
    const [columnApi, setColumnApi] = useState(null);
    const [calcId, setCalcId] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [successful, setSuccessful] = useState(false);
    const [working, setWorking] = useState(false);
    const [fail, setFail] = useState(false);
    const [sheetname, setSheetName] = useState("");
    const [date, setDate] = useState(null);

    const columnDefs = [
        { headerName: 'Product Name', field: 'name', editable: false },
        { headerName: 'Price', field: 'price', editable: false },
        { headerName: 'Sell Price', field: 'sellPrice', editable: false },
        { headerName: 'Quantity', field: 'quantity', editable: true },
        { headerName: 'Total Price', field: 'totalPrice', editable: false }
    ];

    const defaultColDef = {
        resizable: true,
        sortable: true,
        filter: true
    };

    function calculateTotal(){
        rowData.map(product => {
            total += product.price * product.quantity;
    });
    setTotalPrice(total);
    total = 0;
}

    useEffect(() => {
        async function getData() {
            const storedCalcId = localStorage.getItem('calcId');
            setCalcId(storedCalcId);
            const sheetData = await getCalculationData(storedCalcId);
            setRowData(sheetData.map(product => ({
                ...product,
                totalPrice: product.price * product.quantity // Calculate initial total price
            })));
            const info = await getSheetInfo(localStorage.getItem("userId"), localStorage.getItem('calcId'))
            const {sheetName, createdAt} = info;
            setSheetName(sheetName);
            setDate(createdAt);
            setLoading(false);
        }
        if(localStorage.getItem("calcId")){
            getData();
        } else {
            navigate("UserDashboard")
        }
    }, []);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);
    };

    const onCellValueChanged = (params) => {
        if (params.colDef.field === 'quantity') {
            const newData = rowData.map(row => {
                if (row.name === params.data.name) {
                    return { ...row, totalPrice: row.price * params.data.quantity };
                }
                return row;
            });
            setRowData(newData);
        }
    };

    window.onbeforeunload = function() {
        localStorage.removeItem("calcId");
        window.onbeforeunload = null;
      };

    const handleSaveClick = async () => {
        try {
          console.log(rowData)
          setWorking(true);
            const success = await saveCalculationData(calcId, rowData);
            if (success) {
                setWorking(false);
                setFail(false);
                setSuccessful(true);
            } else {
                setWorking(false);
                setSuccessful(false);
                setFail(true);
                console.error('Failed to save calculation data');
            }
        } catch (error) {
            setWorking(false);
                setSuccessful(false);
                setFail(true);
            console.error('Error saving calculation data:', error);
        }
    };

    return (
        <div className="bg-white mx-auto max-w-7xl min-h-screen">
            <Stack spacing={3} alignItems="center">
                <NavBar />
                {!loading && (
                    <>
                 <h1>Sheet name : {sheetname}, Created At : {date}</h1>
                    <div className="ag-theme-alpine" style={{ height: 490, width: '75%' }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                            onCellValueChanged={onCellValueChanged}
                        />
                    </div>
                    </>
                )}
                <Button variant='contained' onClick={handleSaveClick}>Save</Button>
                <Button variant='contained' onClick={() => {calculateTotal()}}>
                    Get Total
                    </Button>

                <h1>Total : {totalPrice}</h1>
            </Stack>
            {working && (
      <Alert variant="filled" severity="info" className="absolute bottom-5">
        Saving your data...
      </Alert>
    )}
    {successful && (
      <Alert variant="filled" severity="success" className="absolute bottom-5">
       Save successful!
      </Alert>
    )}
    {fail && (
      <Alert variant="filled" severity="error" className="absolute bottom-5">
        Failed to save..
      </Alert>
    )}
        </div>
    );
};

export default Calculate;
