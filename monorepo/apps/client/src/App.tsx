
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Contest from './pages/contest/Contest';
import Customer from './pages/customer/Customer';
import Book from './pages/book/Book';

const drawerWidth = 260;

export default function App(): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleToggleSidebar = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header drawerWidth={drawerWidth} onMenuClick={handleToggleSidebar} />
      <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box component="main" sx={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth}px` }} >
        {/* sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: { md: `calc(70% - ${drawerWidth}px)` } }} */}
        <Toolbar />
        <Routes>
          <Route path="/" element={<Contest />} />
          <Route path="/books" element={<Book />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}
