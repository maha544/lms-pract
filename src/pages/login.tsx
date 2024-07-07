import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Snackbar, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendData } from '../config/firebaseMethods';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendData('users', { username, password });
      setOpenSnackbar(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            sx={{
              margin: 1,
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        message="You have successfully signed in to EduWave"
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default Login;
