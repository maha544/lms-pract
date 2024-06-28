import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';
import SyllabusForm from './syllForm';

const SyllabusList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

  const handleAddSyllabusClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
  ];

  const rows = [
    { id: 1, class: '10th', subject: 'Math', description: 'Algebra, Geometry, Trigonometry' },
    { id: 2, class: '10th', subject: 'Science', description: 'Physics, Chemistry, Biology' },
    { id: 3, class: '10th', subject: 'English', description: 'Grammar, Literature, Composition' },
    { id: 4, class: '9th', subject: 'Math', description: 'Number Theory, Polynomials' },
    { id: 5, class: '9th', subject: 'Science', description: 'Matter, Energy, Ecosystems' },
    { id: 6, class: '9th', subject: 'English', description: 'Reading Comprehension, Writing' },
    { id: 7, class: '8th', subject: 'Math', description: 'Fractions, Decimals, Percentages' },
    { id: 8, class: '8th', subject: 'Science', description: 'Cells, Human Body, Earth Science' },
    { id: 9, class: '8th', subject: 'English', description: 'Vocabulary, Essay Writing' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{color: '#006494'}}>Syllabus List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddSyllabusClick}>
            Syllabus Form
          </Button>
      </Box>
      )}

     {showForm ? (
        <SyllabusForm onClose={handleCloseForm} />
      ) : (
        <Box sx={{ height: 500, width: '100%' }}>
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

export default SyllabusList;
