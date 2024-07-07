import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, editData } from '../../config/firebaseMethods';
import ClassForm from './classForm';

interface Class {
  id: string;
  className: string;
  teacher: string;
  numStudents: number;
  roomNumber: string;
}

const ClassList: React.FC = () => {
  const [rows, setRows] = useState<Class[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    try {
      const classData = await getData<Class>('classes');
      setRows(classData);
    } catch (error) {
      console.error('Error fetching class list:', error);
      setRows([]);
    }
  };

  const handleAddClassClick = () => {
    setSelectedClass(null);
    setShowForm(true);
  };

  const handleEditClassClick = (classData: Class) => {
    setSelectedClass(classData);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedClass(null);
  };

  const handleSaveClass = async (classData: Class) => {
    try {
      if (selectedClass) {
        await editData('classes', classData.id, classData);
      } else {
        await editData('classes', classData.id, classData);
      }
      fetchClassList();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'className', headerName: 'Class Name', width: 150 },
    { field: 'teacher', headerName: 'Teacher', width: 150 },
    { field: 'numStudents', headerName: 'Number of Students', width: 180 },
    { field: 'roomNumber', headerName: 'Room Number', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditClassClick(params.row as Class)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ color: '#006494', margin: 2 }}>Class List</Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" onClick={handleAddClassClick}>
            Add Class
          </Button>
        </Box>
        {showForm ? (
          <ClassForm onClose={handleCloseForm} initialClass={selectedClass} onSave={handleSaveClass} />
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

export default ClassList;
