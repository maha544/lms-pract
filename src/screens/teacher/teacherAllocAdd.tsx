import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import AllocateTeacherForm from './allocateTeacherForm';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Teacher Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'subject', headerName: 'Subject', width: 150 },
  { field: 'class', headerName: 'Class', width: 150 },
];

const rows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', subject: 'Math', class: 'Class 1' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', subject: 'Science', class: 'Class 2' },
  { id: 3, name: 'Jack Johnson', email: 'jack.johnson@example.com', subject: 'History', class: 'Class 3' },
];

const TeacherAllocation: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTeacherClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{color: '#006494'}}>Teacher Allocation List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddTeacherClick}>
            Add Teacher for Allocation
          </Button>
        </Box>
      )}
      {showForm ? (
        <AllocateTeacherForm onClose={handleCloseForm} />
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

export default TeacherAllocation;
