import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import "@fontsource/roboto/400.css";

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTemporaryText, setShowTemporaryText] = useState(true);
  const [currentTitle, setCurrentTitle] = useState('EduWave');

  const menuItems = [
    { text: 'Students', path: 'students/list' },
    { text: 'Teachers', path: 'teacher/list' },
    { text: 'Classes', path: 'class/list' },
    { text: 'Subjects', path: 'subject/list' },
    { text: 'Exams', path: 'exam/schedule' },
    { text: 'School', path: 'school/registration' },
    { text: 'Fees', path: 'fees/structure' },
    { text: 'Syllabus', path: 'syllabus/list' },
    { text: 'Admission', path: 'admission' },
  ];

  const handleMenuItemClick = (item: { text: any; path: any; }) => {
    setShowTemporaryText(false);
    setCurrentTitle(item.text);
    navigate(item.path);
  };

  return (
    <Box sx={{ display: 'flex', }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h4" component="div"
            sx={{
              flexGrow: 1,
              m: 2,
              color: '#006494',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
            }}
          >
            EduWave
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding onClick={() => handleMenuItemClick(item)}>
                <ListItemButton>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#006494',
            color: '#fff',
            padding: 2,
            boxShadow: 3,
            height: '65px',
            px: 3,
          }}
        >
          <Typography variant="h5">
            {currentTitle}
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          {showTemporaryText ? (
            <Typography variant="h6" sx={{ mt: 3 }}>
              Welcome to EduWave! Here you can manage all aspects of the school system. Use the menu to navigate to different sections.
            </Typography>
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
