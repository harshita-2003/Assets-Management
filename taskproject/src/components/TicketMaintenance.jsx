import React, { useState } from 'react';
import '../styles/TicketMaintenance.css';
import AddTicket from './AddTicket';
import Env from '../Env';
import UpdateTicket from './UpdateTicket';


export default function TicketMaintenance(props) {

  const [updatedticket, setupdatedticket] = useState(null)

  //todeleteticket
  async function handledelete(e){
    try {
      const ticketid = e.target.value;
      const result = await fetch(`${Env.URL}/deleteticket/${ticketid}` , {method:'DELETE'})
      let finalResult = await result.json();
      console.log(finalResult)
      props.getticket();
      
    } catch (error) {
      console.log(error);
    }
  }


  //toupdateticket
  function handleupdate(ticket){
    setupdatedticket(ticket)
  }

  function handleUpdateticket(updateticket) {
    props.getticket();    
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
          <AddTicket getticket={props.getticket}/>
        </div>
        <div className="tickets">
          {props.tickets.map(ticket => (
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
                <button className='btn btn-info mx-1' onClick={() => handleupdate(ticket)} value={ticket._id}>Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {updatedticket && <UpdateTicket ticket={updatedticket} onClose={handleCloseUpdateModal} onUpdate={handleUpdateticket}/>}

    </>
  );
}
