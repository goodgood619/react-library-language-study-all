import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
import SampleProgressBar from "../../components/ProgressBar/index";
import { useEffect, useState } from "react";
import RowDataFactory from "../../utils/RowDataFactory";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
const SampleGrid = () => {
  const [rowData, setRowData] = useState<Array<any>>(new RowDataFactory().createRowData());


  useEffect(()=> {
    // 1초마다 Proficiency 업데이트
    setTimeout(
      ()=> setRowData(new RowDataFactory().createRowData())
      ,1000);
  },[rowData]);

  const rowSelected = (e : any) => {
    console.log('selected Row : ',e);
  };
  
  const IsExternalFilterPresent = () => {
    
    return true;
  };

  const doesExternalFilterPass = (node : any) => {
    console.log('doesExternalFilterPass node : ',node);
    return true;
  };

  return (
    <div
    className="ag-theme-alpine" 
      style={{
        width: "100%",
        height : 500,
      }}
    >
      <AgGridReact 
      rowData={rowData} 
      modules={AllCommunityModules}
      rowSelection="multiple"
      onRowSelected={rowSelected}
      isExternalFilterPresent={IsExternalFilterPresent}
      doesExternalFilterPass={doesExternalFilterPass}>
        <AgGridColumn
            field="groups"
            headerName="GROUPS"
            filter="agTextColumnFilter"
            sortable={true}
        />
        <AgGridColumn
            field="nodes"
            headerName="NODES"
            sortable={true}
        />
        <AgGridColumn
            field="aids"
            headerName="AIDS"
            sortable={true}
        />
        <AgGridColumn
            field="units"
            headerName="UNITS"
            filter="agTextColumnFilter"
            sortable={true}
        />
        <AgGridColumn
            field="hardware"
            headerName="HARDWARE"
            sortable={true}
        />
        <AgGridColumn
            field="fpga"
            headerName="FPGA Version"
            filter="agNumberColumnFilter"
            sortable={true} // 오름차순 내림차순 가능
        />
        <AgGridColumn
            field="software"
            headerName="SoftWare Version"
            sortable={true}
        />
        <AgGridColumn
            field="serialNumber"
            headerName="Serial Number"
            sortable={true}
        />
        <AgGridColumn
          field="proficiency"
          width={180}
          
          cellRendererFramework={SampleProgressBar}
        />
        <AgGridColumn
            field="result"
            headerName="RESULT"
            sortable={true}
        />
      </AgGridReact>
    </div>
  );
};

export default SampleGrid;
