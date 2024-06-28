import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import AddTeacherForm from './teacherAddEdt';
import TeacherAllocation from './teacherAllocAdd';

const TeacherList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAllocation, setShowAllocation] = useState(false);

  const handleAddTeacherClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSeeAllocationClick = () => {
    setShowAllocation(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'class', headerName: 'Class', width: 110 },
    { field: 'subject', headerName: 'Subject', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const rows = [
    { id: 1, name: 'Sead Ahmed', class: '10th', subject: 'English', email: 'ahmed@example.com' },
    { id: 2, name: 'Samreen Khan', class: '10th', subject: 'Math', email: 'samreen@example.com' },
    { id: 3, name: 'Laiba Ahmed', class: '9th', subject: 'Science', email: 'laiba@example.com' },
    { id: 4, name: 'Kashif Mumtaz', class: '7th', subject: 'English', email: 'kashif@example.com' },
    { id: 5, name: 'Maryum Ayaz', class:'10th', subject: 'Urdu', email: 'maryum@example.com' },
    { id: 6, name: 'Ali Mughal', class: '8th', subject: 'Islamiat', email: 'ali@example.com' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && !showAllocation && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{color: '#006494'}}>Teachers List</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddTeacherClick} sx={{ mr: 2 }}>
              Add Teacher
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSeeAllocationClick}>
              Teacher Allocation List
            </Button>
          </Box>
        </Box>
      )}
      {showForm && <AddTeacherForm onClose={handleCloseForm} />}
      {showAllocation && <TeacherAllocation />}
      {!showForm && !showAllocation && (
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

export default TeacherList;
