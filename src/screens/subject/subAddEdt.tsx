import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Subject {
  id: string;
  class: string;
  subject: string;
}
interface SubjectAddProps {
  onClose: () => void;
  onSubmit: (subject: Subject) => void;
  initialSubject?: Subject | null;
}

const SubjectAddForm: React.FC<SubjectAddProps> = ({ onClose, onSubmit, initialSubject }) => {
  const [subjectClass, setSubjectClass] = useState(initialSubject?.class || '');
  const [subjectName, setSubjectName] = useState(initialSubject?.subject || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newSubject: Subject= {
      id: initialSubject?.id || generateNewId(),
      class: subjectClass,
      subject: subjectName,
    };
    onSubmit(newSubject);
    onClose();
  };

  const generateNewId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ color: '#006494' }}>Add Subject</Typography>
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
