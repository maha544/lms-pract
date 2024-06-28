import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddTeacherForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
      <Typography variant="h6" sx={{color: '#006494'}}>Add New Teacher</Typography>
      <TextField label="Name" variant="outlined" required />
      <TextField label="Class" variant="outlined" type="number" required />
      <TextField label="Subject" variant="outlined" required />
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
