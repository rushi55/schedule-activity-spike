import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import './styles.css'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const fullWidth = (params) => {
  console.log(params.api.getColumnDefs())
  const eDiv = document.createElement("div");
  eDiv.innerHTML = "<div class='container'>hi</div>";
  return eDiv.firstChild
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

const App = () => {
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000, type: "car" },
    { make: "Toyota", model: "Celica", price: 33000, type: "car" },
    { make: "Toyota", type: "car", fullWidth: true },
    { make: "Ford", model: "Mondeo", price: 32000, type: "car" },
    { make: "Porsche", model: "Boxter", price: 72000, type: "car" },
    { make: "Harley", model: "Davidson", price: 72000, type: "motorbike" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
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
        // getRowHeight={({node}) => node?.data?.fullWidth && 75 }
      />
    </div>
  );
};

export default App;
