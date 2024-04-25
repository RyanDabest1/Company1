import NavBar from '../components/HomePage/NavBar.jsx';
import { Stack, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getMergedCalculationData } from '../functions/funct.js';
import { useNavigate } from 'react-router-dom';

let total = 0;
const MergedView = () => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [calcId, setCalcId] = useState("");
    const [GridApi, setGridApi] = useState(null);
    const [ColumnApi, setColumnApi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const columnDefs = [
        { headerName: 'Product Name', field: 'name', editable: false },
        { headerName: 'Price', field: 'price', editable: false },
        { headerName: 'Sell Price', field: 'sellPrice', editable: false },
        { headerName: 'Quantity', field: 'quantity', editable: false },
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
            const sheetData = await getMergedCalculationData(storedCalcId);
            setRowData(sheetData.map(product => ({
                ...product,
                totalPrice: product.price * product.quantity // Calculate initial total price
            })
            ) 
       );
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
        if(localStorage.getItem("calcId")){
        localStorage.removeItem("calcId");
        window.onbeforeunload = null;
        return "" ;
        } else {
            window.onbeforeunload = null;
            return ""; 
        }
      };

    return (
        <div className="bg-white mx-auto max-w-7xl min-h-screen">
            <Stack spacing={3} alignItems="center">
                <NavBar />
                {!loading && (
                    <div className="ag-theme-alpine" style={{ height: 500, width: '76%' }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                            onCellValueChanged={onCellValueChanged}
                        />
                    </div>
                )}
                <Button variant='contained' onClick={() => {calculateTotal()}}>
                    Get Total
                    </Button>

                <h1>Total : {totalPrice}</h1>
            </Stack>
        </div>
    );
};

export default MergedView;
