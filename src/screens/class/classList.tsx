import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddClassForm from './classForm'; 

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Class Name', width: 150 },
  { field: 'teacher', headerName: 'Teacher', width: 150 },
  { field: 'students', headerName: 'Number of Students', width: 180 },
  { field: 'room', headerName: 'Room Number', width: 120 },
];

const rows = [
  { id: 1, name: 'Math 101', teacher: 'Mr. Smith', students: 30, room: 'A1' },
  { id: 2, name: 'Science 101', teacher: 'Ms. Johnson', students: 25, room: 'B1' },
  { id: 3, name: 'History 101', teacher: 'Mr. Brown', students: 20, room: 'C1' },
];

const ClassList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddClassClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{color: '#006494'}}>Class List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddClassClick}>
            Add Class
          </Button>
        </Box>
      )}
      {showForm ? (
        <AddClassForm onClose={handleCloseForm} />
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

export default ClassList;
