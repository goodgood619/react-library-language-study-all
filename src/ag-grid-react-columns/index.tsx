import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';

const ColumnExample = () => {// overrides the default using a multiple column types
    const dType = ['dateColumn', 'nonEditableColumn'];
    // a default column definition with properties that get applied to every column
    const defaultColDef = {
        // set every column width
        width: 200,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter',
    };
    
    // if we had column groups, we could provide default group items here
    const defaultColGroupDef = {};
    
    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact defaultColDef={defaultColDef}>
                <AgGridColumn headerName="Athlete" field="athlete" type="rightAligned"/>
                <AgGridColumn headerName="Sport" field="sport" />
                <AgGridColumn headerName="Age" field="age" />
            </AgGridReact>
        </div>
    );
};

export default ColumnExample;