import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FeeSubmission from './feeSubmission';
import FeeVoucher from './feeVoucher';
import { getData, editData, sendData } from '../../config/firebaseMethods';

interface Fee {
  id?: string;
  feeType: string;
  amount: number;
  studentName: string;
  studentClass: string;
}

const FeeStructure: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [fees, setFees] = useState<Fee[]>([]);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const feeData = await getData<Fee>('fees');
      setFees(feeData);
    } catch (error) {
      console.error('Error fetching fees:', error);
      setFees([]);
    }
  };

  const handleAddFeeClick = () => {
    setSelectedFee(null);
    setShowForm(true);
  };

  const handleEditFeeClick = (fee: Fee) => {
    setSelectedFee(fee);
    setShowForm(true);
  };

  const handleVoucherClick = (fee: Fee) => {
    setSelectedFee(fee);
    setShowVoucher(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedFee(null);
  };

  const handleCloseVoucher = () => {
    setShowVoucher(false);
    setSelectedFee(null);
  };

  const handleSaveFee = async (editedFee: Fee) => {
    try {
      if (editedFee.id) {
        await editData('fees', editedFee.id, editedFee);
      } else {
        const newFee = { ...editedFee, id: generateUniqueId() };
        await sendData('fees', newFee);
      }
      fetchFees();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving fee:', error);
    }
  };
  const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'studentName', headerName: 'Student Name', width: 200 },
    { field: 'studentClass', headerName: 'Class', width: 150 },
    { field: 'feeType', headerName: 'Fee Type', width: 200 },
    { field: 'amount', headerName: 'Amount (PKR)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditFeeClick(params.row as Fee)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleVoucherClick(params.row as Fee)}
          >
            Voucher
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && !showVoucher && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Fee Structure</Typography>
          <Button variant="contained" color="primary" onClick={handleAddFeeClick}>
            Add Fee
          </Button>
        </Box>
      )}

      {showForm && (
        <FeeSubmission onClose={handleCloseForm} onSave={handleSaveFee} initialFee={selectedFee} />
      )}

      {showVoucher && selectedFee && (
        <FeeVoucher onClose={handleCloseVoucher} fee={selectedFee} />
      )}

      {!showForm && !showVoucher && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={fees}
            columns={columns}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default FeeStructure;

