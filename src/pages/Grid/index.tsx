import { AgGridReact } from "@ag-grid-community/react";
import SampleProgressBar from "../../components/ProgressBar/index";
import { useEffect, useState } from "react";
import RowDataFactory from "../../utils/RowDataFactory";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import SampleButton from '../../button/index';
const SampleGrid = () => {
  const [rowData, setRowData] = useState<Array<any>>(new RowDataFactory().createRowData());
  const[gridApi,setGridApi] = useState<any>();
  const [columnApi, setColumnApi] = useState<any>();

  const columnDefs = [
    {
      field : "button",
      width : 50,
      checkboxSelection : true,   
      headerCheckboxSelection: true, // check 필요
      headerCheckboxSelectionFilteredOnly: true, //check 필요
    },
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
      ,10000000);

      console.log('rowData is changed?',rowData);
  },[rowData]);

  const rowSelected = (e : any) => {
    console.log('selected Row : ',e);
  };

  const onGridReady = (params : any)=> {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const selectionChanged = () => {
      const selectedRows = gridApi.getSelectedRows();
      const getRowGroupColumns = columnApi.getRowGroupColumns();
      const getValueColumns = columnApi.getValueColumns();
      const getPivotColumns = columnApi.getPivotColumns();
      const getAllGridColumns = columnApi.getAllGridColumns();
      const getColumnGroup = columnApi.getColumnGroup('UNITS'); // not work

      console.log('selectedRows :  ',selectedRows);  
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

  const exportCSV = () => {
    const params = {
      fileName: 'testexport',
    };
    gridApi.exportDataAsCsv(params);
  };

  const cellValueChanged = (e : any) => {
    console.log('edited data : ',e.data);
    console.log('edited Index',e.rowIndex);

    let newRowData = rowData.map((value : any,index : number)=> {
      return index === e.rowIndex ? {...value,data : e.data} : value
    });

    console.log('when edited newRowData',newRowData);
    // setRowData(newRowData); 
  };

  return (
    <div
    className="ag-theme-alpine" 
      style={{
        width: "100%",
        height : 500,
      }}
    >
      <button onClick={exportCSV}>
        test export csv
      </button>

      <AgGridReact 
      columnDefs={columnDefs}
      rowData={rowData} 
      onGridReady={onGridReady}
      modules={AllCommunityModules}
      enableBrowserTooltips={true}
      rowSelection="multiple"
      onRowSelected={rowSelected}
      isExternalFilterPresent={IsExternalFilterPresent}
      doesExternalFilterPass={doesExternalFilterPass}
      multiSortKey={'ctrl'}
      onSelectionChanged={selectionChanged}
      onCellValueChanged={cellValueChanged}
      >
      </AgGridReact>
    </div>
  );
};

export default SampleGrid;
