import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AllocateTeacherForm from './allocateTeacherForm';
import { getData, sendData } from '../../config/firebaseMethods';

interface TeacherData {
  id: string;
  name: string;
  email: string;
  subject: string;
  class: string;
}

const TeacherAllocation: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherData | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData<TeacherData[]>('teachers');
      if (data) {
        const flattenedData = data.flat();
        setTeachers(flattenedData);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setTeachers([]);
    }
  };

  const handleAddTeacherClick = () => {
    setShowForm(true);
    setSelectedTeacher(undefined);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (formData: TeacherData) => {
    try {
      if (selectedTeacher) {
        await sendData('teachers', { ...formData, id: selectedTeacher.id });
      } else {
        await sendData('teachers', formData);
      }
      fetchData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleEditClick = (teacher: TeacherData) => {
    setSelectedTeacher(teacher);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Teacher Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'class', headerName: 'Class', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as TeacherData)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Teacher Allocation List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddTeacherClick}>
            Add Teacher for Allocation
          </Button>
        </Box>
      )}

      {showForm ? (
        <AllocateTeacherForm onClose={handleCloseForm} onSubmit={handleSubmit} editData={selectedTeacher} />
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={teachers}
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
