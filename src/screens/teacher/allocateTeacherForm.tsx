import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';

interface AllocateTeacherFormProps {
  onClose: () => void;
  onSubmit: (formData: TeacherData) => Promise<void>;
  editData?: TeacherData;
}

interface TeacherData {
  id: string;
  name: string;
  email: string;
  subject: string;
  class: string;
}

const AllocateTeacherForm: React.FC<AllocateTeacherFormProps> = ({ onClose, onSubmit, editData }) => {
  const [teacherName, setTeacherName] = useState(editData ? editData.name : '');
  const [selectedClass, setSelectedClass] = useState(editData ? editData.class : '');
  const [selectedSubject, setSelectedSubject] = useState(editData ? editData.subject : '');
  const [teacherEmail, setTeacherEmail] = useState(editData ? editData.email : '');

  useEffect(() => {
    if (editData) {
      setTeacherName(editData.name);
      setSelectedClass(editData.class);
      setSelectedSubject(editData.subject);
      setTeacherEmail(editData.email);
    }
  }, [editData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const formData: TeacherData = {
        id: editData ? editData.id : '', 
        name: teacherName,
        email: teacherEmail,
        subject: selectedSubject,
        class: selectedClass,
      };

      await onSubmit(formData); 
      onClose(); 
    } catch (error) {
      console.error('Error adding/editing teacher:', error);
    }
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
      <Typography variant="h6" sx={{ color: '#006494' }}>{editData ? 'Edit Teacher' : 'Allocate Teacher'}</Typography>
      <TextField
        label="Teacher Name"
        variant="outlined"
        required
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        required
        value={teacherEmail}
        onChange={(e) => setTeacherEmail(e.target.value)}
      />
      <TextField
        label="Class"
        variant="outlined"
        select
        required
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <MenuItem value="10th">Class 10</MenuItem>
        <MenuItem value="9th">Class 9</MenuItem>
        <MenuItem value="8th">Class 8</MenuItem>
      </TextField>
      <TextField
        label="Subject"
        variant="outlined"
        select
        required
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <MenuItem value="Math">Math</MenuItem>
        <MenuItem value="Science">Biology</MenuItem>
        <MenuItem value="History">Physics</MenuItem>
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Social Studies">Chemistry</MenuItem>
        <MenuItem value="Urdu">Urdu</MenuItem>
        <MenuItem value="Computer Sci">Computer Sci</MenuItem>
        <MenuItem value="Islamiat">IslamiaComputer Sci</MenuItem>
      </TextField>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {editData ? 'Save Changes' : 'Submit'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AllocateTeacherForm;
