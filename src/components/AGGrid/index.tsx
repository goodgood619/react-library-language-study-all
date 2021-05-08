import { AgGridReact } from "@ag-grid-community/react";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

export interface gridApi {
    columnDef?: any;
    rowData?: any;
    onGridReady?: any;
    modules?: any;
    enableBrowserTooltips?: any;
    rowSelection?: string;
    onCellClicked?: any;
    isExternalFilterPresent?: any;
    doesExternalFilterPass?: any;
    multiSortkey?: string;
    onSelectionChanged?: any;
    onCellValueChanged?: any;
    gridApi?: any;
    columnApi?: any;
}

const AGGridSample: React.FC<gridApi> = props => {

    const exportCSV = () => {
        const params = {
          fileName: "testexport",
        };
        props.gridApi.exportDataAsCsv(params);
    };

    return (
        <>
        <button onClick={exportCSV}>test export csv</button>

        <AgGridReact
          columnDefs={props.columnDef}
          rowData={props.rowData}
          onGridReady={props.onGridReady}
          modules={props.modules}
          enableBrowserTooltips={props.enableBrowserTooltips}
          rowSelection={props.rowSelection}
          onCellClicked={props.onCellClicked}
          isExternalFilterPresent={props.isExternalFilterPresent}
          doesExternalFilterPass={props.doesExternalFilterPass}
          multiSortKey={props.multiSortkey}
          onSelectionChanged={props.onSelectionChanged}
          onCellValueChanged={props.onCellValueChanged}
        />
        </>
    );
};

export default AGGridSample;