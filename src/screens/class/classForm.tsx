import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { sendData } from '../../config/firebaseMethods';

const AddClassForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [classes , setClasses] = useState()
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const addData = ()=>{
      let obj = {
        classes : classes,
      createdAt : JSON.stringify((new Date))
      }
      sendData('classes' , obj)
    }

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
      <Typography variant="h6" sx={{color: '#006494'}}>Add New Class</Typography>
      <TextField label="Class Name" variant="outlined" required />
      <TextField label="Teacher" variant="outlined" required />
      <TextField label="Number of Students" variant="outlined" type="number" required />
      <TextField label="Room Number" variant="outlined" required />
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

export default AddClassForm;
