import React, { useEffect, useState } from 'react';
import '../styles/TicketMaintenance.css';
import AddTicket from './AddTicket';
import Env from '../Env';
import UpdateTicket from './UpdateTicket';


export default function TicketMaintenance() {

  const [tickets, setTickets] = useState([]);
  const [updatedticket, setupdatedticket] = useState(null)

  async function getticket(){
    const url = await fetch(`${Env.URL}/getticket`)
    const result = await url.json()

    setTickets(result);
  }

  useEffect(() => {
    getticket()
  }, []);


  //todeleteticket
  async function handledelete(e){
    try {
      const ticketid = e.target.value;
      const result = await fetch(`${Env.URL}/deleteticket/${ticketid}` , {method:'DELETE'})
      let finalResult = await result.json();
      console.log(finalResult)
      getticket();
      
    } catch (error) {
      console.log(error);
    }
  }


  //toupdateticket
  function handleupdate(ticket){
    setupdatedticket(ticket)
  }

  function handleUpdateticket(updateticket) {
    getticket();    
    setupdatedticket(null);
  }

  function handleCloseUpdateModal() {
    setupdatedticket(null);
  }



  return (
    <>
      <div className="ticket-maintenance">
        <h2 className='mb-3'>Ticket Maintenance for Asset ID</h2>
        <div>
          <AddTicket getticket={getticket}/>
        </div>
        <div className="tickets">
          {tickets.map(ticket => (
            <div className="ticket-card" key={ticket.ticketId}>
              <div className='upper'>
                <h5>Ticket ID: {ticket.ticketId}</h5>
                <p><strong>Asset ID:</strong> {ticket.assetId}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Date Raised:</strong> {ticket.raiseddate}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
              </div>
              <div className='d-flex'>
                <button className='btn btn-danger mx-1' onClick={handledelete} value={ticket._id}>Delete</button>
                <button className='btn btn-primary mx-1' onClick={() => handleupdate(ticket)} value={ticket._id}>Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {updatedticket && <UpdateTicket ticket={updatedticket} onClose={handleCloseUpdateModal} onUpdate={handleUpdateticket}/>}

      {/* <div>
        <h1 class="upcomming">Ticket Maintenance for Asset ID: </h1>
        <div className="row">
        {tickets.map(element => (
          <div className="col col-md-6"> 
              <div class="item">
                <div class="item-right">
                  <h2 class="num">Ticket ID:</h2>
                  <p class="day">{element.ticketId}</p>
                  <span class="up-border"></span>
                  <span class="down-border"></span>
                </div> 
                
                <div class="item-left">
                  <p class="event">Asset ID: {element.assetId}</p>
                  <h2 class="title">Description: {element.description}</h2>
                  
                  <div class="sce">
                    <p>Date Raised: <br/>  {new Date(element.dateRaised).toLocaleDateString()}</p>
                  </div>
                  <div class="fix"></div>
                  <div class="fix"></div>
                  <button class="tickets"> {element.status}</button>
                </div>
              </div>
          </div>
        ))}
        </div>
        
        
        
        
      </div> */}

    </>
  );
}
