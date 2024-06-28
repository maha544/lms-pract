import React from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';

const AllocateTeacherForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
      <Typography variant="h6" sx={{color: '#006494'}}>Allocate Teacher</Typography>
      <TextField label="Teacher Name" variant="outlined" required />
      <TextField
        label="Class"
        variant="outlined"
        select
        required
      >
        <MenuItem value="Class 1">Class 1</MenuItem>
        <MenuItem value="Class 2">Class 2</MenuItem>
        <MenuItem value="Class 3">Class 3</MenuItem>
      </TextField>
      <TextField
        label="Subject"
        variant="outlined"
        select
        required
      >
        <MenuItem value="Math">Math</MenuItem>
        <MenuItem value="Science">Science</MenuItem>
        <MenuItem value="History">History</MenuItem>
      </TextField>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AllocateTeacherForm;
