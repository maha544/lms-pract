import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Class {
  id: string;
  className: string;
  teacher: string;
  numStudents: number;
  roomNumber: string;
}
interface ClassFormProps {
  initialClass?: Class | null;
  onClose: () => void;
  onSave: (classData: Class) => Promise<void>;
}

const ClassForm: React.FC<ClassFormProps> = ({ initialClass, onClose, onSave }) => {
  const [classData, setClassData] = useState<Class>({
    id: initialClass?.id ?? '',
    className: initialClass?.className ?? '',
    teacher: initialClass?.teacher ?? '',
    numStudents: initialClass?.numStudents ?? 0,
    roomNumber: initialClass?.roomNumber ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassData({
      ...classData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(classData);
      setClassData({
        id: '',
        className: '',
        teacher: '',
        numStudents: 0,
        roomNumber: '',
      });
      onClose();
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#006494' }}>
        {initialClass ? 'Edit Class' : 'Add Class'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          label="ID"
          name="id"
          value={classData.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={!!initialClass}
        />
        <TextField
          label="Class Name"
          name="className"
          value={classData.className}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Teacher"
          name="teacher"
          value={classData.teacher}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Number of Students"
          name="numStudents"
          value={classData.numStudents}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Room Number"
          name="roomNumber"
          value={classData.roomNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          {initialClass ? 'Update Class' : 'Add Class'}
        </Button>
      </Box>
    </Box>
  );
};

export default ClassForm;
