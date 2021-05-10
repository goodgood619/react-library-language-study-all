import SampleProgressBar from "../../../components/ProgressBar/index";
import { useEffect,useState } from "react";
import RowDataFactory from "../../../utils/RowDataFactory";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import SampleEditDeleteButton from "../../../components/EditDeleteButton/index";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import Modal from "react-modal";

import SampleButton from "../../button/index";

import AGGridSample from '../../../components/AGGrid/index';

import ReactChartjsSample from '../../../components/Chart/index';

interface RowDataType {
  index?: number | undefined;
  aids?: string | undefined;
  fpga?: string | undefined;
  groups?: string | undefined;
  hardware?: string | undefined;
  nodes?: string | undefined;
  proficiency?: number | undefined;
  result?: string | undefined;
  software?: string | undefined;
  serialNumber?: string | undefined;
  units?: string | undefined;
}
const SampleGrid = () => {
  const [rowData, setRowData] = useState<any>(new RowDataFactory().createRowData());
  const [ChartData,setChartData] = useState<any>(new RowDataFactory().createChartData());
  const [gridApi, setGridApi] = useState<any>();
  const [columnApi, setColumnApi] = useState<any>();
  const [selectedRow, setSelectedRow] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<RowDataType>({});

  const selectedHandler = (e: any) => {
    console.log("selectedHandler : ", e.data);
  };

  const handlecloseModal = () => {
    setSelectedRow(!selectedRow);
  };

  const handleSelectedRow = () => {
    setSelectedRow(!selectedRow);
  };

  const handleDeleteRow = () => {
    // setSelectedDeleteIndex();
  };

  const rowDeleteHandle = (deleteIndex: number) => {
    let newRowData = rowData.filter((value: any, index: number) => {
      return index !== deleteIndex;
    });
    setRowData(newRowData);
  };

  const columnDefs = [
    // {
    //   field : "button",
    //   width : 50,
    //   checkboxSelection : true,
    //   headerCheckboxSelection: true, // check 필요(headerName이 아니라 checkBox 모양)
    //   headerCheckboxSelectionFilteredOnly: true, //check 필요
    // },
    {
      field: "EditDelete",
      headerName: "EditDelete",
      cellRendererFramework: SampleEditDeleteButton,
      cellRendererParams: { method: handleSelectedRow, method2: rowDeleteHandle },
    },
    {
      field: "groups",
      headerName: "GROUPS",
      filter: "agTextColumnFilter",
      sortable: true,
      editable: true,
      cellStyle : function(params : any) {
        console.log(params);
        return {backgroundColor : 'green'};
      }
    },
    {
      field: "nodes",
      headerName: "NODES",
      sortable: true,
      editable: true,
    },
    {
      field: "aids",
      headerName: "AIDS",
      sortable: true,
      editable: true,
    },
    {
      field: "units",
      headerName: "UNITS",
      filter: "agTextColumnFilter",
      sortable: true,
      editable: true,
    },
    {
      field: "hardware",
      headerName: "HardWare Version",
      filter: "agTextColumnFilter",
      sortable: true,
      editable: true,
    },
    {
      field: "software",
      headerName: "SoftWare Version",
      sortable: true,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      sortable: true,
    },
    {
      field: "proficiency",
      width: 180,
      cellRendererFramework: SampleProgressBar,
      filter: "agTextColumnFilter",
      sortable: true,
      editable: true,
    },
    {
      field: "result",
      headerName: "RESULT",
      sortable: true,
    },
  ];
  useEffect(() => {
    // 10초마다 Proficiency 업데이트
    // setTimeout(() => setRowData(new RowDataFactory().createRowData()), 1000000);

    // console.log("rowData is changed?", rowData);
  }, [rowData, selectedRow]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const selectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    const getRowGroupColumns = columnApi.getRowGroupColumns();
    const getValueColumns = columnApi.getValueColumns();
    const getPivotColumns = columnApi.getPivotColumns();
    const getAllGridColumns = columnApi.getAllGridColumns();
    const getColumnGroup = columnApi.getColumnGroup("UNITS"); // not work

    console.log("selectedRows :  ", selectedRows);
  };

  const IsExternalFilterPresent = () => {
    return true;
  };

  const doesExternalFilterPass = (node: any) => {
    // proficiency가 20이상인것만 보여짐
    if (node.data.proficiency >= 20) {
      return true;
    }
    return false;
  };

  const cellValueChanged = (e: any) => {
    console.log("edited data : ", e.data);
    console.log("edited Index", e.rowIndex);

    let newRowData = rowData.map((value: any, index: number) => {
      return index === e.rowIndex ? { ...value, data: e.data } : value;
    });

    console.log("when edited newRowData", newRowData);
    setRowData(newRowData);
  };

  const cellClicked = (params: any) => {
    const buttonName = params.event.target.innerText;

    if (buttonName === 'Edit') {
      let data: RowDataType = params.data;
      data.index = params.rowIndex;
      setSelectedRowData(data);
    }
    else if (buttonName === 'Delete') {
      const deleteIndex = params.rowIndex;
      rowDeleteHandle(deleteIndex);
    }
    else {

    }

  }

  const editGroups = (e: any) => {

    let newRowData: any = rowData.map((value: any, index: number) => {
      return index === Number(e.target[9].value) ? {
        ...value,
        groups: e.target[0].value,
        nodes: e.target[1].value,
        aids: e.target[2].value,
        units: e.target[3].value,
        hardware: e.target[4].value,
        software: e.target[5].value,
        serialNumber: e.target[6].value,
        proficency: Number(e.target[7].value),
        result: e.target[8].value
      } : value;
    });

    setRowData(newRowData);
    setSelectedRow(!selectedRow);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: 500,
      }}
    >
      <AGGridSample
        columnDef = {columnDefs}
        rowData = {rowData}
        onGridReady={onGridReady}
        modules={AllCommunityModules}
        enableBrowserTooltips={true}
        rowSelection="multiple"
        onCellClicked={cellClicked}
        isExternalFilterPresent={IsExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
        multiSortkey={"ctrl"}
        onSelectionChanged={selectionChanged}
        onCellValueChanged={cellValueChanged}
        gridApi={gridApi}
        columnApi={columnApi}
      />
      <ReactChartjsSample
        data={ChartData}
      />
      <Modal isOpen={selectedRow} onRequestClose={handlecloseModal}>
        <div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <form onSubmit={editGroups}>
                <p>
                  GROUPS : <input defaultValue={selectedRowData.groups} />
                </p>
                <p>
                  NODES : <input defaultValue={selectedRowData.nodes} />
                </p>
                <p>
                  AIDS : <input defaultValue={selectedRowData.aids} />
                </p>
                <p>
                  UNITS : <input defaultValue={selectedRowData.units} />
                </p>
                <p>
                  HardWare Version :
                  <input defaultValue={selectedRowData.hardware} />
                </p>
                <p>
                  SoftWare Version :
                  <input defaultValue={selectedRowData.software} />
                </p>
                <p>
                  Serial Number :
                  <input defaultValue={selectedRowData.serialNumber} />
                </p>
                <p>
                  Proficency :
                  <input defaultValue={selectedRowData.proficiency} />
                </p>
                <p>
                  RESULT : <input defaultValue={selectedRowData.result} />
                </p>
                <input type="hidden" defaultValue={selectedRowData.index}></input>
                <button onSubmit={editGroups}>edit</button>
              </form>
            </div>
            <button onClick={handlecloseModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SampleGrid;
