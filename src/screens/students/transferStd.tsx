import React from 'react';
import { Box, Typography } from '@mui/material';

type Student = {
    id: string;
    name: string;
    age: number;
    grade: string;
    email: string;
  }
type TransferStudentListProps = {
  students: Student[];
};

const TransferStudentList: React.FC<TransferStudentListProps> = ({ students }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ color: '#006494', mb: 2 }}>Transfer Student List</Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
        {students.map((student) => (
          <Box key={student.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{student.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Grade: {student.grade}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TransferStudentList;
