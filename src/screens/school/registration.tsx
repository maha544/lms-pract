import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { sendData } from '../../config/firebaseMethods';

const SchoolRegistrationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentCell, setParentCell] = useState('');
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [previousClass, setPreviousClass] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const registrationData = {
      parentName,
      parentEmail,
      parentCell,
      studentName,
      dateOfBirth,
      previousClass,
      previousSchool,
      createdAt: JSON.stringify(new Date()),
    };

    sendData('registrations', registrationData)
      .then(() => {
        setSuccessMessage('Registration form submitted successfully!');
        setTimeout(() => {
          setSuccessMessage(null);
          setParentName('');
          setParentEmail('');
          setParentCell('');
          setStudentName('');
          setDateOfBirth('');
          setPreviousClass('');
          setPreviousSchool('');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting registration form:', error);
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
          <Typography variant="h6" sx={{ color: '#006494' }}>School Registration Form</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to EduWave! Please fill out the form below to register your child in our school.
          </Typography>
          <TextField label="Parent's Name" value={parentName} onChange={(e) => setParentName(e.target.value)} variant="outlined" required />
          <TextField label="Parent's Email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} variant="outlined" type='email' required />
          <TextField label="Parent's Cell No" value={parentCell} onChange={(e) => setParentCell(e.target.value)} variant="outlined" required />
          <TextField label="Student's Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} variant="outlined" required />
          <TextField label="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} variant="outlined" required />
          <TextField label="Previous Class" value={previousClass} onChange={(e) => setPreviousClass(e.target.value)} variant="outlined" required />
          <TextField label="Previous School Name" value={previousSchool} onChange={(e) => setPreviousSchool(e.target.value)} variant="outlined" required />
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

export default SchoolRegistrationForm;
