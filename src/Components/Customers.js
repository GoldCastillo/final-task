import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Button from "@material-ui/core/Button";
import { PropertyKeys } from "ag-grid-community";
import AddTraining from "./AddTraining"
import Trainings from "./Trainings"

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();
  useEffect(() => {
    getCustomers();
  }, []);


  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };
  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
      .then((_) => setAddOpen(true))
      .catch((err) => console.error(err));
  };
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
      
    })
      .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
      .then((_) => setUpdateOpen(true))
      .catch((err) => console.error(err));
     
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link[0].href, { method: "DELETE" })
        .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
        .then((_) => setDeleteOpen(true))
        .catch((err) => console.error(err));
    } };
    const addTraining = (newTraining) => {
      fetch("https://customerrest.herokuapp.com/api/trainings", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTraining),
      })
        .then((_) => gridRef.current.refreshCells({ rowNodes: getCustomers()}))
        .then((_) => setAddOpen(true))
        .catch((err) => console.error(err));
    };
 
  const columns = [
    {
      headerName: "First name",
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last name",
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Street address",
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Postcode",
      field: "postcode",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Phone",
      field: "phone",
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      width: "auto",
      cellRendererFramework: (row) => (
        <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
      ),
    },
    {
      headerName: "",
      field: "links",
      width: "auto",

      cellRendererFramework: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => deleteCustomer(params.value)}
        >
          Delete
        </Button>
      ),
    },
    {
      headerName: "",
      width: "auto",
      cellRendererFramework: (params) => <AddTraining addTraining={addTraining} params={params}/>,
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "700px", width: "70%", margin: "auto" }}
    >
      <h2>Customers</h2>
      <div>
        <AddCustomer addCustomer={addCustomer} />
      </div>
      <AgGridReact
        ref={gridRef}
        suppressCellSelection={true}
        onGridReady={(params) => {
          gridRef.current = params.api;
        }}
        columnDefs={columns}
        rowData={customers}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
         </div>
  );
}

export default Customers;
