import { Button, Box } from "@mui/material";

export default function ForButtons(){
    return(
        <>
        <Box>
        <Button 
         variant="contained"
         sx={{
            m:1,
            backgroundColor: '#6096ba'}}
         >
            ADD</Button>
        <Button
         variant="contained"
         sx={{
            m:1,
            backgroundColor: '#6096ba',
        }}
         > 
            EDIT</Button>
        </Box>
        </>
    )
}