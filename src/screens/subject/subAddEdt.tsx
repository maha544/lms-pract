import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface SubjectAddProps {
  onClose: () => void;
  onSubmit: (subject: { class: string; subject: string }) => void;
}

const SubjectAddForm: React.FC<SubjectAddProps> = ({ onClose, onSubmit }) => {
  const [subjectClass, setSubjectClass] = useState('');
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ class: subjectClass, subject: subjectName });
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{color: '#006494'}}>Add Subject</Typography>
      <TextField
        label="Class"
        value={subjectClass}
        onChange={(e) => setSubjectClass(e.target.value)}
        required
      />
      <TextField
        label="Subject"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default SubjectAddForm;
