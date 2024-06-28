import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Button , Box } from '@mui/material';
import AddStdForm from './stdAddEdt';

const StudentList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddStdClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const rows = [
    { id: 1, name: 'John Doe', age: 14, grade: '9th', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 15, grade: '10th', email: 'jane.smith@example.com' },
    { id: 3, name: 'Jack', age: 15, grade: '10th', email: 'jack@example.com' },
    { id: 4, name: 'Dong', age: 13, grade: '8th', email: 'dong@example.com' },
    { id: 5, name: 'James', age: 13, grade: '8th', email: 'james@example.com' },
    { id: 6, name: 'William', age: 14, grade: '9th', email: 'william@example.com' },
  ];

return (
  <Box sx={{ padding: 4 }}>
    {!showForm && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" sx={{color: '#006494'}}>Students List</Typography>
      <Button variant="contained" color="primary" onClick={handleAddStdClick}>
        Add Class
      </Button>
    </Box>
  )}
    {showForm ? (
      <AddStdForm onClose={handleCloseForm} />
    ) : (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    )}
  </Box>
);
};

export default StudentList;
