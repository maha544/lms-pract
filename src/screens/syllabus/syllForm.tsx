import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Syllabus {
  id: string;
  class: string;
  subject: string;
  description: string;
}

interface SyllabusFormProps {
  initialSyllabus?: Syllabus | null;
  onClose: () => void;
  onSave: (syllabus: Syllabus) => Promise<void>;
}

const SyllabusForm: React.FC<SyllabusFormProps> = ({ initialSyllabus, onClose, onSave }) => {
  const [syllabus, setSyllabus] = useState<Syllabus>({
    id: initialSyllabus?.id ?? '',
    class: initialSyllabus?.class ?? '',
    subject: initialSyllabus?.subject ?? '',
    description: initialSyllabus?.description ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyllabus({
      ...syllabus,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Syllabus:', syllabus);
    try {
      await onSave(syllabus);
      setSyllabus({
        id: '',
        class: '',
        subject: '',
        description: '',
      });
      onClose();
    } catch (error) {
      console.error('Error saving syllabus:', error);
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
        {initialSyllabus ? 'Edit Syllabus' : 'Add Syllabus'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          label="ID"
          name="id"
          value={syllabus.id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={!!initialSyllabus}
        />
        <TextField
          label="Class"
          name="class"
          value={syllabus.class}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Subject"
          name="subject"
          value={syllabus.subject}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={syllabus.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          {initialSyllabus ? 'Update Syllabus' : 'Add Syllabus'}
        </Button>
      </Box>
    </Box>
  );
};

export default SyllabusForm;
