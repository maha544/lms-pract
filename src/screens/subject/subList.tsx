import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import SubjectAddForm from './subAddEdt';

const SubjectList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState([
    { id: 1, class: '10th', subject: 'Math' },
    { id: 2, class: '10th', subject: 'Science' },
    { id: 3, class: '10th', subject: 'English' },
    { id: 4, class: '9th', subject: 'Math' },
    { id: 5, class: '9th', subject: 'Science' },
    { id: 6, class: '9th', subject: 'English' },
    { id: 7, class: '8th', subject: 'Math' },
    { id: 8, class: '8th', subject: 'Science' },
    { id: 9, class: '8th', subject: 'English' },
  ]);

  const handleAddSubjectClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddSubject = (newSubject: { class: string; subject: string }) => {
    const newId = subjects.length ? subjects[subjects.length - 1].id + 1 : 1;
    setSubjects([...subjects, { id: newId, ...newSubject }]);
    setShowForm(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{color: '#006494'}}>Subject List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddSubjectClick}>
            Add Subject
          </Button>
        </Box>
      )}

      {showForm ? (
        <SubjectAddForm onClose={handleCloseForm} onSubmit={handleAddSubject} />
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={subjects}
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

export default SubjectList;
