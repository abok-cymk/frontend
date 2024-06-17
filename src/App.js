import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard';
import ClientPage from './pages/ClientPage';

function App() {
  return (
    <Routes>
      <Route path='/admin' element={ <AdminDashboard />} />
      <Route path='/' element={<ClientPage />} />
    </Routes>
  );
}

export default App;
