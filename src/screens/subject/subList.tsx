import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SubjectAddForm from './subAddEdt';
import { getData, editData } from '../../config/firebaseMethods';

interface Subject {
  id: string;
  class: string;
  subject: string;
}

const SubjectList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectData = await getData<Subject>('subjects');
      setSubjects(subjectData);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  };

  const handleAddSubjectClick = () => {
    setSelectedSubject(null);
    setShowForm(true);
  };

  const handleEditSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject); 
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedSubject(null);
  };

  const handleSaveSubject = async (editedSubject: Subject) => {
    try {
      await editData('subjects', editedSubject.id, editedSubject);
      fetchSubjects();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditSubjectClick(params.row as Subject)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Subject List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddSubjectClick}>
            Add Subject
          </Button>
        </Box>
      )}

      {showForm ? (
        <SubjectAddForm onClose={handleCloseForm} onSubmit={handleSaveSubject} initialSubject={selectedSubject} />
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
