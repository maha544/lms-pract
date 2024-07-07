import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type Fee = {
  id?: string;
  feeType: string;
  amount: number;
  studentName: string;
  studentClass: string;
};

interface FeeSubmissionProps {
  onClose: () => void;
  onSave: (editedFee: Fee) => Promise<void>;
  initialFee: Fee | null;
}

const FeeSubmission: React.FC<FeeSubmissionProps> = ({ onClose, onSave, initialFee }) => {
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  useEffect(() => {
    if (initialFee) {
      setFeeType(initialFee.feeType);
      setAmount(initialFee.amount.toString());
      setStudentName(initialFee.studentName);
      setStudentClass(initialFee.studentClass);
    }
  }, [initialFee]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newFee: Fee = {
        id: initialFee?.id,
        feeType,
        amount: parseFloat(amount),
        studentName,
        studentClass,
      };

      await onSave(newFee);
      onClose();
    } catch (error) {
      console.error('Error submitting fee:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ color: '#006494' }}>Submit Fee</Typography>
      <TextField
        label="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />
      <TextField
        label="Class"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        required
      />
      <TextField
        label="Fee Type"
        value={feeType}
        onChange={(e) => setFeeType(e.target.value)}
        required
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default FeeSubmission;
