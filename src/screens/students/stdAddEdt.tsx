import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  email: string;
}

interface StudentAddEdtProps {
  onClose: () => void;
  onSave: (newStudent: Omit<Student, 'id'>) => void;
  selectedStudent: Student | null;
}

const StudentAddEdt: React.FC<StudentAddEdtProps> = ({ onClose, onSave, selectedStudent }) => {
  const [name, setName] = useState(selectedStudent ? selectedStudent.name : '');
  const [age, setAge] = useState(selectedStudent ? selectedStudent.age.toString() : '');
  const [grade, setGrade] = useState(selectedStudent ? selectedStudent.grade : '');
  const [email, setEmail] = useState(selectedStudent ? selectedStudent.email : '');

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setAge(selectedStudent.age.toString());
      setGrade(selectedStudent.grade);
      setEmail(selectedStudent.email);
    }
  }, [selectedStudent]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, age: Number(age), grade, email });
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" sx={{ color: '#006494' }}>{selectedStudent ? 'Edit Student' : 'Add New Student'}</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" required />
      <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} variant="outlined" type="number" required />
      <TextField label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} variant="outlined" required />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" required />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedStudent ? 'Save Changes' : 'Submit'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default StudentAddEdt;
