import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AppProvider } from './AppProvider';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;