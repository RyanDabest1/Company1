import NavBar from '../components/HomePage/NavBar.jsx';
import { Stack, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getCalculationData, saveCalculationData } from '../functions/funct.js';

const Calculate = () => {
    const [gridApi, setGridApi] = useState(null);
    const [columnApi, setColumnApi] = useState(null);
    const [calcId, setCalcId] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        async function getData() {
            const storedCalcId = localStorage.getItem('calcId');
            setCalcId(storedCalcId);
            const sheetData = await getCalculationData(storedCalcId);
            setRowData(sheetData.map(product => ({
                ...product,
                totalPrice: product.price * product.quantity // Calculate initial total price
            })));
            setLoading(false);
        }
        getData();
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

    const handleSaveClick = async () => {
        try {
          console.log(rowData)
            const success = await saveCalculationData(calcId, rowData);
            if (success) {
                console.log('Calculation data saved successfully');
            } else {
                console.error('Failed to save calculation data');
            }
        } catch (error) {
            console.error('Error saving calculation data:', error);
        }
    };

    return (
        <div className="bg-white mx-auto max-w-7xl min-h-screen">
            <Stack spacing={3} alignItems="center">
                <NavBar />
                {!loading && (
                    <div className="ag-theme-alpine" style={{ height: 400, width: '75%' }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                            onCellValueChanged={onCellValueChanged}
                        />
                    </div>
                )}
                <Button variant='contained' onClick={handleSaveClick}>Save</Button>
            </Stack>
        </div>
    );
};

export default Calculate;
