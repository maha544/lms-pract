import React from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

const SyllabusForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [syllabus, setSyllabus] = React.useState({
    class: '',
    subject: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyllabus({
      ...syllabus,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Syllabus:', syllabus);
    setSyllabus({ class: '', subject: '', description: '' });
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
      <Typography variant="h4" gutterBottom sx={{color: '#006494'}}>
        Add Syllabus
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
        <TextField
          select
          label="Class"
          name="class"
          value={syllabus.class}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="8th">8th</MenuItem>
          <MenuItem value="9th">9th</MenuItem>
          <MenuItem value="10th">10th</MenuItem>
        </TextField>
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
          Add Syllabus
        </Button>
      </Box>
    </Box>
  );
};

export default SyllabusForm;
