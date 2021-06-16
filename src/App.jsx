import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "./styles.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const fullWidth = (params) => {
  console.log(params);
  const eDiv = document.createElement("div");
  eDiv.innerHTML = "<div class='container'><button>Add Model</button></div>";
  // return eDiv.firstChild;
  return (
    <div class="container">
      <button>Add Model</button>
    </div>
  );
};

const columnDefs = [
  {
    headerName: "Type",
    field: "type",
    rowGroup: true,
    hide: true,
  },
  {
    headerName: "Make",
    rowGroup: true,
    hide: true,
    valueGetter: ({ data }) => data?.make,
  },
  {
    headerName: "Model",
    valueGetter: ({ data }) => data?.model,
  },
  {
    headerName: "Price",
    valueGetter: ({ data }) => data?.price,
  },
];

const columnDefs2 = [
  {
    headerName: "Type",
    field: "type",
    rowGroup: true,
    hide: true,
  },
  {
    headerName: "Make",
    rowGroup: true,
    hide: true,
    valueGetter: ({ data }) => data?.make,
  },
  {
    headerName: "Model",
    hide: true,
    valueGetter: ({ data }) => data?.model,
  },
  {
    headerName: "Price",
    valueGetter: ({ data }) => data?.price,
  },
];
const rowData1 = [
  { make: "Toyota", model: "Celica", price: 35000, type: "car" },
  { make: "Toyota", model: "Celica", price: 33000, type: "car" },
  { make: "Toyota", type: "car", fullWidth: true },
  { make: "Ford", model: "Mondeo", price: 32000, type: "car" },
  { make: "Porsche", model: "Boxter", price: 72000, type: "car" },
  { make: "Harley", model: "Davidson", price: 72000, type: "motorbike" },
];

const rowData2 = [
  { make: "Toyota", model: "Celica", price: 35000, type: "car" },
  { make: "Toyota", model: "Celica", price: 33000, type: "car" },
  { make: "Toyota", type: "car", fullWidth: true },
  { make: "Ford", model: "Mondeo", price: 32000, type: "car" },
  { make: "Porsche", model: "Boxter", price: 72000, type: "car" },
  { make: "Harley", model: "Davidson", price: 72000, type: "motorbike" },
];

const rowData3 = rowData2.map((data) => ({
  filePath: [data.type, data.make, data.model],
  ...data,
}));
const App = () => {
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData1}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true,
          }}
          autoGroupColumnDef={{ minWidth: 200 }}
          fullWidthCellRenderer={fullWidth}
          isFullWidthCell={({ data }) => data?.fullWidth}
        />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData3}
          columnDefs={columnDefs2}
          frameworkComponents={{
           fullWidthRenderer: fullWidth
          }}
          defaultColDef={{
            flex: 1,
            width: 100,
            filter: true,
            sortable: true,
            resizable: true,
          }}
          treeData={true}
          getDataPath={(data) => data.filePath}
          fullWidthCellRenderer={'fullWidthRenderer'}
          groupDefaultExpanded={-1}
          isFullWidthCell={({ data }) => data?.fullWidth}
        />
      </div>
    </>
  );
};

export default App;
