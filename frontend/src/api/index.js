import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('userInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
    return req;
});

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users', formData);

// Admin / Staff Management
export const getAllUsers = () => API.get('/users');
export const getDashboardStats = () => API.get('/users/dashboard/stats');
export const createStaffUser = (userData) => API.post('/users/staff', userData);
export const updateStaffUser = (id, userData) => API.put(`/users/staff/${id}`, userData);
export const deleteStaffUser = (id) => API.delete(`/users/staff/${id}`);

// Room Management
export const getRooms = () => API.get('/rooms');
export const getRoomById = (id) => API.get(`/rooms/${id}`);
export const createRoom = (roomData) => API.post('/rooms', roomData);
export const updateRoom = (id, roomData) => API.put(`/rooms/${id}`, roomData);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

// Booking Management
export const getBookings = () => API.get('/bookings');
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getMyBookings = () => API.get('/bookings/mybookings');
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}/status`, { status });

// Housekeeping Management
export const getHousekeepingTasks = () => API.get('/housekeeping');
export const createHousekeepingTask = (taskData) => API.post('/housekeeping', taskData);
export const updateHousekeepingStatus = (id, statusData) => API.put(`/housekeeping/${id}`, statusData);
export const deleteHousekeepingTask = (id) => API.delete(`/housekeeping/${id}`);

// Maintenance Management
export const getMaintenanceRequests = () => API.get('/maintenance');
export const createMaintenanceRequest = (requestData) => API.post('/maintenance', requestData);
export const updateMaintenanceStatus = (id, statusData) => API.put(`/maintenance/${id}`, statusData);
export const deleteMaintenanceRequest = (id) => API.delete(`/maintenance/${id}`);

export default API;
