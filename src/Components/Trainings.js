import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Moment from "moment";
import Button from "@material-ui/core/Button";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };
  

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      })
        .then((_) => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
        .then((_) => setDeleteOpen(true))
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      headerName: "Time",
      field: "date",
      cellRenderer: (data) => {
        return Moment(data.value).format("MM.DD.YYYY HH:mm");
      },
      sortable: true,
      filter: true,
    },
    
    {
      headerName: "Duration",
      field: "duration",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "First name",
      field: "customer.firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last name",
      field: "customer.lastname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      field: "data",
      width: "auto",
      cellRendererFramework: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => deleteTraining(params.data.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "700px", width: "70%", margin: "auto" }}
    >
      <h2>Trainings</h2>

      <AgGridReact
        ref={gridRef}
        suppressCellSelection={true}
        onGridReady={(params) => {
          gridRef.current = params.api;
        }}
        columnDefs={columns}
        rowData={trainings}
        pagination="true"
        paginationPageSize="10"
      ></AgGridReact>
    </div>
  );
}

export default Trainings;
