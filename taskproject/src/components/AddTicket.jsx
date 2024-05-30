import React, { useState } from 'react';
import '../styles/AddAsset.css'
import { baseUrl } from '../Url';

export default function AddTicket({getticket}) {

    const [formData, setFormData] = useState({
        assetId: "",
        description: "",
        raiseddate: "",
        status: ""
      });
    
      const [errors, setErrors] = useState({});
    
      async function senddata(formdata) {
        try {
            let result = await fetch(`${baseUrl}/addticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
    
            if (!result.ok) {
                const errorText = await result.text();
                throw new Error(`Network response was not ok : ${errorText}`);
            }
    
            let finalresult = await result.json();
            console.log(finalresult);
    
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setErrors({ submit: error.message });

        }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
          
          senddata(formData);
    
          document.querySelector('#exampleModalCenter .close').click();

          getticket();

          
          setFormData({
            // ticketId: "",
            assetId: "",
            description: "",
            raiseddate: "",
            status: ""
          })

          getticket();

        } else {
          setErrors(validationErrors);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    
      const validateFormData = (data) => {
        let errors = {};
        if (!data.assetId) errors.assetId = "Asset ID is required";
        if (!data.description) errors.description = "Description is required";
        if (!data.raiseddate) errors.raiseddate = "Raised Date is required";
        if (!data.status) errors.status = "Status is required";
        return errors;
      };


  return (
    <div>
      <button type="button" className="btn btn-dark btn-lg mb-4" data-toggle="modal" data-target="#exampleModalCenter">
        Generate Ticket 🎟️
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add Ticket</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} method='post' action='/addticket'>
                <h2 className='text-center'>Add Ticket Form</h2>
                <div>
                  <label>Asset ID:</label>
                  <input type="text" name="assetId" value={formData.assetId} onChange={handleChange} />
                  {errors.assetId && <span className="error">{errors.assetId}</span>}
                </div>
                <div>
                  <label>Description:</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} />
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>
                
                <div>
                  <label>Raised Date:</label>
                  <input type="date" name="raiseddate" value={formData.raiseddate} onChange={handleChange} />
                  {errors.raiseddate && <span className="error">{errors.raiseddate}</span>}
                </div>
                <div>
                  <label>Status:</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
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
