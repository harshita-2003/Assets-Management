import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import TicketMaintenance from './components/TicketMaintenance';
import Sidebar from './components/Sidebar';
import './App.css';
import AddAsset from './components/AddAsset';
import { baseUrl } from '../Url';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggleSidebar() {
    setCollapsed(!collapsed);
  }

  const [assets, setAssets] = useState([]);

  //to render the assets
  async function getData() {
    try {
      let result = await fetch(`${baseUrl}/assets`);
      let finalResult = await result.json();
      setAssets(finalResult);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  },[])

  //gettickets
  const [tickets, setTickets] = useState([]);

  async function getticket(){
    const url = await fetch(`${Env.URL}/getticket`)
    const result = await url.json()

    setTickets(result);
  }

  useEffect(() => {
    getticket()
  }, []);

  return (
    <Router>
        <Sidebar collapsed={collapsed} toggleSidebar={handleToggleSidebar} >
          <Routes>
            <Route path="/" element={<Dashboard assets={assets} tickets={tickets} />} />
            <Route path="/assets" element={<Assets assets={assets}  getData={getData}/> } />
            <Route path="/ticket-maintenance" element={<TicketMaintenance tickets={tickets} getticket={getticket} />} />
            <Route path='/addasset' element={<AddAsset />}/>
          </Routes>
        </Sidebar>
    </Router>
    
  );
}

export default App;
