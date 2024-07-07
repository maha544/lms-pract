import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, editData } from '../../config/firebaseMethods';
import SyllabusForm from './syllForm';

interface Syllabus {
  id: string;
  class: string;
  subject: string;
  description: string;
}

const SyllabusList: React.FC = () => {
  const [rows, setRows] = useState<Syllabus[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState<Syllabus | null>(null);

  useEffect(() => {
    fetchSyllabusList();
  }, []);

  const fetchSyllabusList = async () => {
    try {
      const syllabusData = await getData<Syllabus>('syllabus'); 
      setRows(syllabusData);
    } catch (error) {
      console.error('Error fetching syllabus list:', error);
      setRows([]);
    }
  };

  const handleAddSyllabusClick = () => {
    setSelectedSyllabus(null);
    setShowForm(true);
  };

  const handleEditSyllabusClick = (syllabus: Syllabus) => {
    setSelectedSyllabus(syllabus);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedSyllabus(null);
  };

  const handleSaveSyllabus = async (syllabus: Syllabus) => {
    try {
      if (selectedSyllabus) {
        await editData('syllabus', syllabus.id, syllabus);
      } else {
        await editData('syllabus', syllabus.id, syllabus);
      }
      fetchSyllabusList(); 
      handleCloseForm();
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditSyllabusClick(params.row as Syllabus)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ color: '#006494', margin: 2 }}>Syllabus List</Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" onClick={handleAddSyllabusClick}>
            Add Syllabus
          </Button>
        </Box>
        {showForm ? (
          <SyllabusForm onClose={handleCloseForm} initialSyllabus={selectedSyllabus} onSave={handleSaveSyllabus} />
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
    </>
  );
};

export default SyllabusList;
