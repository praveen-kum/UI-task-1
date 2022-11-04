import React, { useEffect, useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import Pagination from './pagination';
import { TableRow } from '@material-ui/core';
import { PagesSharp } from '@material-ui/icons';


// const empList =  [
//   {
//     "id": "1",
//     "name": "Aaron Miles",
//     "email": "aaron@mailinator.com",
//     "role": "member"
//   },
//   {
//     "id": "2",
//     "name": "Aishwarya Naik",
//     "email": "aishwarya@mailinator.com",
//     "role": "member"
//   },
//   {
//     "id": "3",
//     "name": "Arvind Kumar",
//     "email": "arvind@mailinator.com",
//     "role": "admin"
//   }
// ]

function App() {
  const [tableData, setTableData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: 'phone' },
    { title: "Address", field: 'address.street' },
    { title: "Website", field: 'website' }
  ]

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((resp) => {
        setTableData(resp);
      });
  }, []);

  const handleBulkDelete = () => {
    const updatedData = tableData.filter(row => !selectedRows.includes(row))
    setTableData(updatedData)
  };
  const onRowClick = (e, clickedRow) => {
    setSelectedRows(clickedRow);
  };


  return (
    <div className="App">
      <h1 align="center" style={{background:"lightblue"}}>UI Task</h1>
      
      <MaterialTable
      
        title="Employee Data"
        data={tableData}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        columns={columns}
        onRowClick={onRowClick}
        
        options={{
          sorting: true,
          selection: true,
          // showSelectAllCheckbox: true,
          
          rowStyle: row => ({ backgroundColor: row.tableData.checked ? 'lightgray' : '' }),
          paging: true,
          pageSizeOptions: [3,4, 5, 10],
          preserveRowSelection:true,
          addRowPosition: "first",
          paginationType: "stepped", showFirstLastPageButtons: false,
          // rowStyle: (row) =>
          //   row?.id === selectedRows?.id ? { background: "lightgray" } : {background:""},
          // grouping: true, 
          // columnsButton: true,
          // rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          // headerStyle: { background: "lightblue",color:"#fff"}
        }}
        
        actions={[
          {
            icon: 'delete',
            tooltip: "Delete all selected rows",
            onClick: () => handleBulkDelete()
          }
        ]}
       
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 50)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })}}
      />
      
    </div>
  );
}

export default App;

