import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
import SampleProgressBar from "../../components/ProgressBar/index";
import { useEffect, useState } from "react";
import RowDataFactory from "../../utils/RowDataFactory";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
const SampleGrid = () => {
  const [rowData, setRowData] = useState<Array<any>>(new RowDataFactory().createRowData());


  const columnDefs = [
    {
      field : "groups",
      headerName : "GROUPS",
      filter :"agTextColumnFilter",
      sortable : true,
      editable: true,
    },
    {
      field : "nodes",
      headerName : "NODES",
      sortable : true,
      editable: true,
    },
    {
      field : "aids",
      headerName : "AIDS",
      sortable : true,
      editable: true,
    },{
      field : "units",
      headerName : "UNITS",
      filter :"agTextColumnFilter",
      sortable : true,
      editable: true,
    },{
      field : "hardware",
      headerName : "HardWare Version",
      filter :"agTextColumnFilter",
      sortable : true,
      editable: true,
    },
    {
      field : "software",
      headerName : "SoftWare Version",
      sortable : true,
    },
    {
      field : "serialNumber",
      headerName : "Serial Number",
      sortable : true,
    },{
      field : "proficiency",
      width : 180,
      cellRendererFramework:SampleProgressBar,
      filter :"agTextColumnFilter",
      sortable : true,
      editable: true,
    },{
      field : "result",
      headerName : "RESULT",
      sortable : true,
    }
  ];
  useEffect(()=> {
    // 10초마다 Proficiency 업데이트
    setTimeout(
      ()=> setRowData(new RowDataFactory().createRowData())
      ,1000);

      console.log('rowData is changed?',rowData);
  },[rowData]);

  const rowSelected = (e : any) => {
    console.log('selected Row : ',e);
  };
  
  const IsExternalFilterPresent = () => {
    return true;
  };

  const doesExternalFilterPass = (node : any) => {
    // proficiency가 20이상인것만 보여짐
    if(node.data.proficiency >= 20) {
      return true;
    }
    return false;
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
      columnDefs={columnDefs}
      rowData={rowData} 
      modules={AllCommunityModules}
      enableBrowserTooltips={true}
      rowSelection="multiple"
      onRowSelected={rowSelected}
      isExternalFilterPresent={IsExternalFilterPresent}
      doesExternalFilterPass={doesExternalFilterPass}
      multiSortKey={'ctrl'}

      >
      </AgGridReact>
    </div>
  );
};

export default SampleGrid;
