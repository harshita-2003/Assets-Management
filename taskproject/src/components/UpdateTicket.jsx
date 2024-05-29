import React, { useState } from 'react';
import Env from '../Env';

export default function UpdateTicket({ticket , onClose , onUpdate}) {

    const [updatesticket,setupdatesticket] = useState({...ticket})

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await fetch(`${Env.URL}/updateticket/${ticket._id}` , {
                method : 'PUT' ,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(updatesticket)
            })

            if(!result.ok) {
                console.log("resplonse not found ")
            }

            const finalResult = await result.json();
            console.log(finalResult);
            onUpdate(result);
            onClose();
        } catch (error) {
            
        }
        
    }

    function handleChange(e){
        const {name, value} = e.target;
        setupdatesticket(prev => ({...prev, [name] : value}))
    }



  return (
    <div>

      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="updateModalTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalTitle">Update Ticket</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{"max-height": '80vh',"overflow-y": 'auto'}}>
              <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Update Ticket Form</h2>
                <div>
                  <label>Ticket ID:</label>
                  <input type="text" name="ticketId" value={updatesticket.ticketId} onChange={handleChange} />
                </div>
                <div>
                  <label>Asset ID:</label>
                  <input type="text" name="assetId" value={updatesticket.assetId} onChange={handleChange} />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea name="description" value={updatesticket.description} onChange={handleChange} />
                </div>
                <div>
                  <label>Raised Date:</label>
                  <input type="date" name="raiseddate" value={updatesticket.raiseddate} onChange={handleChange} />
                </div>
                <div>
                  <label>Status:</label>
                  <input type="text" name="status" value={updatesticket.status} onChange={handleChange} />
                </div>
                <button className='btn btn-success' type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
