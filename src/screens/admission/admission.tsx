import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AdmissionForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
      <Typography variant="h6" sx={{color: '#006494'}}>Admission Form</Typography>
      <TextField label="Name" variant="outlined" required />
      <TextField label="Age" variant="outlined" type="number" required />
      <TextField label="New Class" variant="outlined" required />
      <TextField label="Previous Class" variant="outlined" required />
      <TextField label="Parent's Cell No" variant="outlined" required />
      <TextField label="Parent's Email" variant="outlined" type='email' required />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit" >
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AdmissionForm;
