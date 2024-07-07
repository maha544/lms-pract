import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getData, sendData } from '../../config/firebaseMethods';

type TransferStudent = {
  id: string;
  name: string;
  fromGrade: string;
  toGrade: string;
  reason: string;
}

const TransferStudentForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [transferStudents, setTransferStudents] = useState<TransferStudent[]>([]);
  const [newTransferStudent, setNewTransferStudent] = useState<Omit<TransferStudent, 'id'>>({
    name: '',
    fromGrade: '',
    toGrade: '',
    reason: '',
  });

  useEffect(() => {
    fetchTransferStudentData();
  }, []);

  const fetchTransferStudentData = async () => {
    try {
      const data = await getData<TransferStudent>('transferStudents');
      setTransferStudents(data);
    } catch (error) {
      console.error('Error fetching transfer student data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransferStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransferStudent = async () => {
    try {
      await sendData('transferStudents', newTransferStudent);
      fetchTransferStudentData();
      setNewTransferStudent({ name: '', fromGrade: '', toGrade: '', reason: '' });
    } catch (error) {
      console.error('Error adding transfer student:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'fromGrade', headerName: 'From Grade', width: 150 },
    { field: 'toGrade', headerName: 'To Grade', width: 150 },
    { field: 'reason', headerName: 'Reason', width: 200 },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#006494' }}>Transfer Student List</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          name="name"
          label="Name"
          value={newTransferStudent.name}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="fromGrade"
          label="From Grade"
          value={newTransferStudent.fromGrade}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="toGrade"
          label="To Grade"
          value={newTransferStudent.toGrade}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          name="reason"
          label="Reason"
          value={newTransferStudent.reason}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTransferStudent}>
          Add Transfer Student
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={transferStudents}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Back to Student List
        </Button>
      </Box>
    </Box>
  );
};

export default TransferStudentForm;
