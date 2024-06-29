import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function ExamSchedule(){

  const columns :GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'class', headerName: 'Class', width: 150 },
    { field: 'paper', headerName: 'Paper', width: 100 },
    { field: 'room', headerName: 'Room', width: 100 }
  ];
  const rows: readonly any[] | undefined = [
    { id: 1, date: '02-06-2024', class: '8th', paper: 'Maths', room: 'A1' },
    { id: 2, date: '02-06-2024', class: '9th', paper: 'Maths', room: 'A2' },
    { id: 3, date: '02-06-2024', class: '10th', paper: 'Maths', room: 'A3' },
  ]

    return(
        <>
        <Box>
            <Typography variant='h5' sx={{color: '#006494', margin:2}}>Exam's Schedule</Typography>
        </Box>
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        </Box>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box> 
       </Box>
        </>
    );
}