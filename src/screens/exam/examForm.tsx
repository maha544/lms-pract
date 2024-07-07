import React from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

type Exam = {
  id: string;
  date: string;
  class: string;
  paper: string;
  room: string;
}

interface ExamFormProps {
  initialExam?: Exam | null;
  onClose: () => void;
  onSave: (exam: Exam) => Promise<void>;
}

const ExamForm: React.FC<ExamFormProps> = ({ initialExam, onClose, onSave }) => {
  const [exam, setExam] = React.useState<Exam>({
    id: initialExam?.id ?? '',
    date: initialExam?.date ?? '',
    class: initialExam?.class ?? '',
    paper: initialExam?.paper ?? '',
    room: initialExam?.room ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExam({
      ...exam,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exam:', exam);
    await onSave(exam);
    setExam({
      id: '',
      date: '',
      class: '',
      paper: '',
      room: '',
    });
    onClose();
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
        {initialExam ? 'Edit Exam' : 'Add Exam'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          label="ID"
          name="id"
          value={exam.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={!!initialExam} // Disable ID field if editing an existing exam
        />
        <TextField
          label="Date"
          name="date"
          value={exam.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Class"
          name="class"
          value={exam.class}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Paper"
          name="paper"
          value={exam.paper}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Room"
          name="room"
          value={exam.room}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          {initialExam ? 'Update Exam' : 'Add Exam'}
        </Button>
      </Box>
    </Box>
  );
};

export default ExamForm;
