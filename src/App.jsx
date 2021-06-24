import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "./styles.css";
import { TestForm } from "./FormControl";
import { InputField } from "./FormControl";
import { GanntChart } from "./GanntChart";
import "bootstrap/dist/css/bootstrap.css";
import * as yup from "yup";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const fullWidth = (params) => {
  console.log({ params });
  const [formMode, setFormMode] = useState(false);
  const [model, setModel] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const rowData = [];
    params.api.forEachNode((node) => rowData.push(node.data));

    // rowData.map((item) => item != null);

    const prevRow = rowData[params.node.rowIndex - 1];
    const newRow = {
      ...prevRow,
      filePath: ["car", "Toyota", model],
      model,
      id: 20,
    };
    // rowData.splice(params.node.rowIndex, 0, newRow);
    console.log({ newRow });
    const newRowData = rowData.filter((item) => item != null);
    console.log({ newRowData });
    params.api.applyTransaction({ add: [newRow] });
    setFormMode(false);
    setModel("");
    // params.api.setRowData(newRowData);
    params.api.refreshCells();
  };

  const onChange = (e) => setModel(e.target.value);

  return (
    <div style={{ paddingLeft: "100px" }}>
      {formMode ? (
        <form onSubmit={onSubmit}>
          <input value={model} onChange={onChange} />
        </form>
      ) : (
        <button onClick={() => setFormMode(true)}>Add Model</button>
      )}
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

const FormInput = (params) => {
  if (params?.data?.formMode) {
    console.log("parms.control", params?.context?.control);
    return (
      <form>
        <InputField
          className="inputField"
          name={params.colDef.headerName.toLowerCase()}
          control={params.context?.control}
        />
      </form>
    );
  }
  return params.value;
};

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
    hide: false,
    valueGetter: ({ data }) => data?.make || "",
    cellRenderer: "formInputRenderer",
  },
  {
    headerName: "Model",
    hide: false,
    valueGetter: ({ data }) => data?.model || "",
    cellRenderer: "formInputRenderer",
  },
  {
    headerName: "Price",
    valueGetter: ({ data }) => data?.price || "",
    cellRenderer: "formInputRenderer",
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
  { id: 1, make: "Toyota", model: "Celica", price: 35000, type: "car" },
  { id: 2, make: "Toyota", model: "Celica", price: 33000, type: "car" },
  // { make: "Toyota", type: "car", fullWidth: true },
  { id: 3, make: "Ford", model: "Mondeo", price: 32000, type: "car" },
  { id: 4, make: "Porsche", model: "Boxter", price: 72000, type: "car" },
  { id: 5, make: "Harley", model: "Davidson", price: 72000, type: "motorbike" },
];

const rowData3 = rowData2.map((data) => ({
  filePath: [data.type, data.make],
  ...data,
}));

const getContextMenuItems = (params) => {
  return [
    {
      // custom item
      name: "Add Activity",
      action: () => {
        const rowData = [];
        params.api.forEachNode((node) => rowData.push(node.data));
        params.api.applyTransaction({
          add: [{ formMode: true, filePath: ["car", ""] }],
        });
      },
    },
    {
      // custom item
      name: "Always Disabled",
      disabled: true,
      tooltip:
        "Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!",
    },
  ];
};

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      make: "",
      model: "",
      price: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        make: yup.string().required(),
        model: yup.string().required(),
        price: yup.number().required(),
      })
    ),
  });

  const onGridReady = (params) => setGridApi(params.api);

  const onSubmit = (values, e) => {
    // Run query
    console.log("Form Submitted: ", values);
    // Remove row and set new row data
    const newRow = {
      ...values,
      type: "car",
      filePath: ["car", values.make],
      id: 23423,
    };
    const rowData = [];
    gridApi.forEachNode((node) => {
      if (node?.data && !node?.data?.formMode) {
        rowData.push(node.data);
      }
    });
    rowData.push(newRow);
    reset();
    gridApi.setRowData(rowData);
  };

  document.addEventListener("click", (e) => {
    Array.from(document.getElementsByClassName("inputField")).forEach(
      (item) => {
        if (!item.contains(e.target)) {
          handleSubmit(onSubmit)()
            .then(() => console.log("success"))
            .catch((err) => console.log("err", err));
        }
      }
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData3}
          columnDefs={columnDefs2}
          frameworkComponents={{
            fullWidthRenderer: fullWidth,
            formInputRenderer: FormInput,
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
          fullWidthCellRenderer={"fullWidthRenderer"}
          groupDefaultExpanded={-1}
          context={{ control }}
          isFullWidthCell={({ data }) => data?.fullWidth}
          getRowNodeId={() => Math.random()}
          allowContextMenuWithControlKey={true}
          getContextMenuItems={getContextMenuItems}
          onGridReady={onGridReady}
        />
      </div>
      <GanntChart />
      {/* <TestForm /> */}
    </form>
  );
};

export default App;
