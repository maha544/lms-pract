import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import StudentAddEdt from './stdAddEdt';
import TransferStudentForm from './transfetStdForm';
import { getData, sendData, editData } from '../../config/firebaseMethods';

type Student = {
  id: string;
  name: string;
  age: number;
  grade: string;
  email: string;
}

const StudentList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const studentData = await getData<Student>('students');
      setStudents(studentData); 
    } catch (error) {
      console.error('Error fetching student data:', error);
      setStudents([]);
    }
  };

  const handleAddStdClick = () => {
    setShowForm(true);
    setSelectedStudent(null);
  };

  const handleTransferStdClick = () => {
    setShowTransferForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowTransferForm(false);
  };

  const handleSaveStudent = async (newStudent: Omit<Student, 'id'>) => {
    try {
      if (selectedStudent) {
        await editData('students', selectedStudent.id, { id: selectedStudent.id, ...newStudent });
      } else {
        await sendData('students', newStudent);
      }
      fetchStudentData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Student)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && !showTransferForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Students List</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddStdClick} sx={{ mr: 2 }}>
              Add Student
            </Button>
            <Button variant="contained" color="secondary" onClick={handleTransferStdClick}>
              Transfer Student List
            </Button>
          </Box>
        </Box>
      )}

      {showForm && <StudentAddEdt onClose={handleCloseForm} onSave={handleSaveStudent} selectedStudent={selectedStudent} />}
      {showTransferForm && <TransferStudentForm onClose={handleCloseForm} />}
      {!showForm && !showTransferForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={students}
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
