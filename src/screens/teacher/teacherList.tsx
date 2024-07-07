import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import AddTeacherForm from './teacherAddEdt';
import TeacherAllocation from './teacherAllocAdd';
import { getData, editData } from '../../config/firebaseMethods';

interface Teacher {
  id: string;
  name: string;
  class: string;
  subject: string;
  email: string;
}

const TeacherList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAllocation, setShowAllocation] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);

  const handleAddTeacherClick = () => {
    setEditTeacher(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchTeachers();
  };

  const handleSeeAllocationClick = () => {
    setShowAllocation(true);
  };

  const handleEditTeacherClick = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
  };

  const fetchTeachers = async () => {
    const teacherList: Teacher[] = await getData('teachers');
    setTeachers(teacherList);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'class', headerName: 'Class', width: 110 },
    { field: 'subject', headerName: 'Subject', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="contained" color="primary" onClick={() => handleEditTeacherClick(params.row as Teacher)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && !showAllocation && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Teachers List</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddTeacherClick} sx={{ mr: 2 }}>
              Add Teacher
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSeeAllocationClick}>
              Teacher Allocation List
            </Button>
          </Box>
        </Box>
      )}
      {showForm && <AddTeacherForm onClose={handleCloseForm} editTeacher={editTeacher} />}
      {showAllocation && <TeacherAllocation />}
      {!showForm && !showAllocation && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={teachers}
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

export default TeacherList;
