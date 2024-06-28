import { Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    navigate('/dashboard')
  };

  return (
    <Box sx={{ backgroundColor: '#006494', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#f0f0f0', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 4,
            width: '100%',
            borderRadius: 4,
          }}
        >
          <Typography 
          sx={{margin:1,
              color: '#006494',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
          }} 
          component="h1" 
          variant="h4">
            EduWave
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#125699' } }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
