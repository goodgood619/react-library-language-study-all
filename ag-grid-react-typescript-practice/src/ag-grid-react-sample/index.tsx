import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';


const AgGridSample = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState<any>([
        {make : "Toyota", model : "Celica",price : 35000},
        {make : "Ford", model : "Celica",price : 32000},
        {make : "Porsche", model : "Boxter",price : 72000},
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact rowData = {rowData} rowSelection="multiple" onRowClicked = {(e:any)=> {alert('price : '+e.data.price);console.log(e);}}>
                <AgGridColumn field="make" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default AgGridSample;