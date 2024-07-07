import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, editData } from '../../config/firebaseMethods';
import ExamForm from './examForm';

interface Exam {
  id: string;
  date: string;
  class: string;
  paper: string;
  room: string;
}

const ExamSchedule: React.FC = () => {
  const [rows, setRows] = useState<Exam[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  useEffect(() => {
    fetchExamSchedule();
  }, []);

  const fetchExamSchedule = async () => {
    try {
      const examData = await getData<Exam>('examSchedule');
      setRows(examData);
    } catch (error) {
      console.error('Error fetching exam schedule:', error);
      setRows([]);
    }
  };

  const handleAddExamClick = () => {
    setSelectedExam(null);
    setShowForm(true);
  };

  const handleEditExamClick = (exam: Exam) => {
    setSelectedExam(exam); 
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedExam(null);
  };

  const handleSaveExam = async (exam: Exam) => {
    try {
      if (selectedExam) {
        await editData('examSchedule', exam.id, exam);
      } else {
        await editData('examSchedule', exam.id, exam);
      }
      fetchExamSchedule();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'paper', headerName: 'Paper', width: 100 },
    { field: 'room', headerName: 'Room', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditExamClick(params.row as Exam)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant='h5' sx={{ color: '#006494', margin: 2 }}>Exam's Schedule</Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" onClick={handleAddExamClick}>
            Add Exam
          </Button>
        </Box>
        {showForm ? (
          <ExamForm onClose={handleCloseForm} initialExam={selectedExam} onSave={handleSaveExam} />
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

export default ExamSchedule;