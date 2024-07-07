import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type ExamResult = {
  id: string;
  name: string;
  subject: string;
  score: string;
  grade: string;
};

type ExamFormProps = {
  initialExamResult?: ExamResult | null;
  onClose: () => void;
  onSave: (exam_res: ExamResult) => Promise<void>;
};

const ExamResultForm: React.FC<ExamFormProps> = ({
  initialExamResult,
  onSave,
  onClose,
}) => {
  const initialExamState: ExamResult = {
    id: initialExamResult?.id || '',
    name: initialExamResult?.name || '',
    subject: initialExamResult?.subject || '',
    score: initialExamResult?.score || '',
    grade: initialExamResult?.grade || '',
  };

  const [examResultState, setExamResultState] = useState<ExamResult>(
    initialExamState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExamResultState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(examResultState);
      setExamResultState(initialExamState); 
      onClose(); 
    } catch (error) {
      console.error('Error saving exam result:', error);
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
        {initialExamResult ? 'Edit Exam Result' : 'Add Exam Result'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          label="ID"
          name="id"
          value={examResultState.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={!!initialExamResult}
        />
        <TextField
          label="Student Name"
          name="name"
          value={examResultState.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Subject"
          name="subject"
          value={examResultState.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Score"
          name="score"
          value={examResultState.score}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Grade"
          name="grade"
          value={examResultState.grade}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          {initialExamResult ? 'Update Exam Result' : 'Add Exam Result'}
        </Button>
      </Box>
    </Box>
  );
};

export default ExamResultForm;
