import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { sendData } from '../../config/firebaseMethods';

const AdmissionForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [newClass, setNewClass] = useState('');
  const [previousClass, setPreviousClass] = useState('');
  const [parentCell, setParentCell] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const admissionData = {
      name,
      age,
      newClass,
      previousClass,
      parentCell,
      parentEmail,
      createdAt: JSON.stringify(new Date()),
    };

    sendData('admissions', admissionData)
      .then(() => {
        setSuccessMessage('Admission form submitted successfully!');
        setTimeout(() => {
          setSuccessMessage(null);
          setName('');
          setAge('');
          setNewClass('');
          setPreviousClass('');
          setParentCell('');
          setParentEmail('');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting admission form:', error);
      });
  };

  return (
    <Box
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
      {successMessage ? (
        <Alert severity="success">{successMessage}</Alert>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: '#006494' }}>Admission Form</Typography>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" required />
          <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))} variant="outlined" type="number" required />
          <TextField label="New Class" value={newClass} onChange={(e) => setNewClass(e.target.value)} variant="outlined" required />
          <TextField label="Previous Class" value={previousClass} onChange={(e) => setPreviousClass(e.target.value)} variant="outlined" required />
          <TextField label="Parent's Cell No" value={parentCell} onChange={(e) => setParentCell(e.target.value)} variant="outlined" required />
          <TextField label="Parent's Email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} variant="outlined" type='email' required />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdmissionForm;
