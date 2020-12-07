import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Moment from "moment";
function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      headerName: "Date",
      field: "date",
      cellRenderer: (data) => {
        return Moment(data.value).format("MM/DD/YYYY");
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Time",
      field: "date",
      cellRenderer: (data) => {
        return Moment(data.value).format("HH:mm");
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
