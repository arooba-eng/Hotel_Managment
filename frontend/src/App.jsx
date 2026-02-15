import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Layouts
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomDetails from './pages/RoomDetails';

// Protected Pages
import Dashboard from './pages/Dashboard';

// Admin / Staff Pages
import AdminDashboard from './pages/Admin/Dashboard';
import SystemUsers from './pages/Admin/SystemUsers';
import RoomManagement from './pages/Admin/RoomManagement';
import ReservationManagement from './pages/Admin/ReservationManagement';
import HousekeepingManagement from './pages/Admin/HousekeepingManagement';
import MaintenanceManagement from './pages/Admin/MaintenanceManagement';

// Auth Guard Component
const ProtectedRoute = ({ children, roles }) => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  if (!userInfo) return <Navigate to="/login" />;
  if (roles && !roles.includes(userInfo.role)) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/rooms" element={<MainLayout><Rooms /></MainLayout>} />
          <Route path="/rooms/:id" element={<MainLayout><RoomDetails /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />

          {/* Guest Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['guest']}>
              <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
          } />

          {/* Admin / Staff Routes with AdminLayout */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance']}>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/system-users" element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout><SystemUsers /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/rooms" element={
            <ProtectedRoute roles={['admin', 'manager']}>
              <AdminLayout><RoomManagement /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/reservations" element={
            <ProtectedRoute roles={['admin', 'manager', 'receptionist']}>
              <AdminLayout><ReservationManagement /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/housekeeping" element={
            <ProtectedRoute roles={['admin', 'manager', 'housekeeping']}>
              <AdminLayout><HousekeepingManagement /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/maintenance" element={
            <ProtectedRoute roles={['admin', 'manager', 'maintenance']}>
              <AdminLayout><MaintenanceManagement /></AdminLayout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
