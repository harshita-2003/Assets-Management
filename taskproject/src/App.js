import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import TicketMaintenance from './components/TicketMaintenance';
import Sidebar from './components/Sidebar'; 

import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggleSidebar() {
    setCollapsed(!collapsed);
  }

  return (
    <Router>
        <Sidebar collapsed={collapsed} toggleSidebar={handleToggleSidebar} >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/ticket-maintenance" element={<TicketMaintenance />} />
          </Routes>
        </Sidebar>
    </Router>
    
  );
}

export default App;
