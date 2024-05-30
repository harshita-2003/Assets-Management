import React, { useState } from 'react';
import { baseUrl } from '../../Url';

export default function UpdateTicket({ticket , onClose , onUpdate}) {

    const [updatesticket,setupdatesticket] = useState({...ticket})
    const [errors, setErrors] = useState({});

    async function handleUPDATE(updatesticket){
        try {
            const result = await fetch(`${baseUrl}/updateticket/${ticket._id}` , {
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
            setErrors({ submit: error.message });
        }
    }

    function handleSubmit(e){

      e.preventDefault();
      const validationErrors = validateFormData(updatesticket);
      if (Object.keys(validationErrors).length === 0) {
          
        handleUPDATE(updatesticket);
  
        document.querySelector('#exampleModalCenter .close').click();
      } else {
        setErrors(validationErrors);
      }
    }

    const validateFormData = (data) => {
      let errors = {};
      if (!data.assetId) errors.assetId = "Asset ID is required";
      if (!data.description) errors.description = "Description is required";
      if (!data.raiseddate) errors.raiseddate = "Raised Date is required";
      if (!data.status) errors.status = "Status is required";
      return errors;
    };

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
                  <label>Asset ID:</label>
                  <input type="text" name="assetId" value={updatesticket.assetId} onChange={handleChange} />
                  {errors.assetId && <span className="error">{errors.assetId}</span>}
                </div>
                <div>
                  <label>Description:</label>
                  <textarea name="description" value={updatesticket.description} onChange={handleChange} />
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <div>
                  <label>Raised Date:</label>
                  <input type="date" name="raiseddate" value={updatesticket.raiseddate} onChange={handleChange} />
                  {errors.raiseddate && <span className="error">{errors.raiseddate}</span>}
                </div>
                <div>
                  <label>Status:</label>
                  <select name="status" value={updatesticket.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                  {errors.status && <span className="error">{errors.status}</span>}
                </div>
                <button className='btn btn-success d-block' type="submit">Submit</button>
                {errors.submit && <span className="error">{errors.submit}</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
