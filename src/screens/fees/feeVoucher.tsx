import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Fee {
  feeType: string;
  amount: number;
  studentName: string;
  studentClass: string;
}

interface FeeVoucherProps {
  onClose: () => void;
  fee: Fee | null;
}

const FeeVoucher: React.FC<FeeVoucherProps> = ({ onClose, fee }) => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ color: '#006494', marginBottom: 2 }}>Fee Voucher</Typography>
      {fee ? (
        <>
          <Typography sx={{ marginBottom: 2 }}>Student Name: {fee.studentName}</Typography>
          <Typography sx={{ marginBottom: 2 }}>Class: {fee.studentClass}</Typography>
          <Typography sx={{ marginBottom: 2 }}>Fee Type: {fee.feeType}</Typography>
          <Typography sx={{ marginBottom: 2 }}>Amount: Rs.{fee.amount}</Typography>
        </>
      ) : (
        <Typography sx={{ marginBottom: 2 }}>No fee details available.</Typography>
      )}
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default FeeVoucher;
