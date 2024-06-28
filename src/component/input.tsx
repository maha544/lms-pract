import Box from '@mui/material/Box';
import { Button , TextField } from '@mui/material';
export default function ForInput(){
    return(
        <>
        <h2 className="m-5">Ask Question</h2>
        <Box sx={{margin:'35px'}}>
              <TextField 
              id="outlined-basic" 
              label="Question" 
              placeholder="write your question...."
              variant="outlined"
              sx={{
                width: '60%',
              }} />
              <Box sx={{margin:'20px'}}>
              <Button 
              variant="contained" 
              color="secondary">Enter</Button>
              </Box>
              </Box>
        </>
    )
}