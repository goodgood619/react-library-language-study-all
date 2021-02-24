import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';

const InterfaceSample = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState<any>([
        {make : "Toyota", model : "Celica",price : 35000},
        {make : "Ford", model : "Celica",price : 32000},
        {make : "Porsche", model : "Boxter",price : 72000},
    ]);

    const onCellClicked = (e : any) => {
        alert('onCellClicked : '+ e.value);
    }

    const onGridReady = (params : any)=> {

    };

    return (
        <AgGridReact 
            ref="agGrid" 
            rowSelection="multiple"
            columnDefs={rowData}
            onCellClicked = {onCellClicked}
            onGridReady={onGridReady}/>
    );
};

export default InterfaceSample;