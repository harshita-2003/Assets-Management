import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaBars, FaDatabase, FaTh, FaTicketAlt } from "react-icons/fa";

const Sidebar = ({children}) => {

  const menuItem = [
    {
      path : '/',
      name : "dashboard",
      icon : <FaTh />
    },
    {
      path : '/assets',
      name : "assets",
      icon : <FaDatabase />
    },
    {
      path : '/ticket-maintenance',
      name : "Ticket",
      icon : <FaTicketAlt />
    }
  ]

  const [collapsed,setCollapsed] = useState(null);


  function handleToggleSidebar() {
    setCollapsed(!collapsed);
  }

  return (
      <div className="container">
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{width:collapsed?'80px':'350px'}}>
          <div className="top_section">
            <h1 className="logo" style={{display:collapsed?'none':'block'}}>Logo</h1>
            <button className="btn text-white" onClick={handleToggleSidebar}><div className="bars">
              <FaBars />
            </div></button>
          </div>

          {
            menuItem.map((item,index) => (
              <NavLink to={item.path} key={index} className="link" activeclassname="active" style={{justifyContent:collapsed?'center':''}}>
                <div className="icon">{item.icon}</div>
                <div className="link_text" style={{display:collapsed?'none':'block'}}>{item.name}</div>
              </NavLink>
            ))
          }

        </div>

        <main>{children}</main>

      </div>

      
  );
};

export default Sidebar;
