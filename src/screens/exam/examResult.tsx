import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ExamResultForm from './examResForm';
import { editData, getData } from '../../config/firebaseMethods';

type ExamResult = {
  id: string;
  name: string;
  subject: string;
  score: string;
  grade: string;
};

const ExamResultList = () => {
  const [rowsResult, setRowsResult] = useState<ExamResult[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamResult | null>(null);

  useEffect(() => {
    fetchExamSchedule();
  }, []);

  const fetchExamSchedule = async () => {
    try {
      const examData = await getData<ExamResult>('examSchedule');
      setRowsResult(examData);
    } catch (error) {
      console.error('Error fetching exam schedule:', error);
      setRowsResult([]);
    }
  };

  const handleAddExamClick = () => {
    setSelectedExam(null);
    setShowForm(true);
  };

  const handleEditExamClick = (exam: ExamResult) => {
    setSelectedExam(exam);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedExam(null);
  };

  const handleSaveExam = async (exam: ExamResult) => {
    try {
      if (selectedExam) {
        await editData('examSchedule', selectedExam.id, exam);
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
    { field: 'name', headerName: 'Student Name', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150 },
    { field: 'score', headerName: 'Score', type: 'number', width: 110 },
    { field: 'grade', headerName: 'Grade', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditExamClick(params.row as ExamResult)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ color: '#006494', margin: 2 }}>
          Exam's Result
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" onClick={handleAddExamClick}>
            Add Exam
          </Button>
        </Box>
        {showForm ? (
          <ExamResultForm onClose={handleCloseForm} initialExamResult={selectedExam} onSave={handleSaveExam} />
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rowsResult}
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

export default ExamResultList;
