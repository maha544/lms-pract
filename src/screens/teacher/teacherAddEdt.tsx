import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { sendData, editData } from '../../config/firebaseMethods';

interface Teacher {
  id: string;
  name: string;
  class: string;
  subject: string;
  email: string;
}

const AddTeacherForm: React.FC<{ onClose: () => void, editTeacher: Teacher | null }> = ({ onClose, editTeacher }) => {
  const [teacher, setTeacher] = useState<Teacher>({ id: '', name: '', class: '', subject: '', email: '' });

  useEffect(() => {
    if (editTeacher) {
      setTeacher(editTeacher);
    }
  }, [editTeacher]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (teacher.id) {
      await editData('teachers', teacher.id, teacher);
    } else {
      await sendData('teachers', teacher);
    }
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
      <Typography variant="h6" sx={{ color: '#006494' }}>{teacher.id ? 'Edit Teacher' : 'Add New Teacher'}</Typography>
      <TextField label="Name" variant="outlined" name="name" value={teacher.name} onChange={handleChange} required />
      <TextField label="Class" variant="outlined" name="class" type="number" value={teacher.class} onChange={handleChange} required />
      <TextField label="Subject" variant="outlined" name="subject" value={teacher.subject} onChange={handleChange} required />
      <TextField label="Email" variant="outlined" name="email" value={teacher.email} onChange={handleChange} required />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddTeacherForm;
