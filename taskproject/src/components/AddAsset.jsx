import React, { useState } from 'react';
import '../styles/AddAsset.css';
import { baseUrl } from '../Url';


export default function AddAssetModal({getData}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    manufacturer: "",
    modelNumber: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: "",
    status: "",
    specifications: {
      power: "",
      voltage: "",
      current: "",
      speed: "",
    },
  });

  const [errors, setErrors] = useState({});

  async function senddata(formdata) {
    try {
        let result = await fetch(`${baseUrl}/addasset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });

        if (!result.ok) {
            const errorText = await result.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        let finalresult = await result.json();
        console.log(finalresult);
        window.location.reload();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      
      senddata(formData);

      // Close the modal after submission (optional)
      document.querySelector('#exampleModalCenter .close').click();

      getData();

      setFormData({
        id: "",
        name: "",
        description: "",
        location: "",
        manufacturer: "",
        modelNumber: "",
        serialNumber: "",
        installationDate: "",
        lastMaintenanceDate: "",
        status: "",
        specifications: {
          power: "",
          voltage: "",
          current: "",
          speed: "",
        },
      })
      getData();

    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [name]: value,
      },
    });
  };

  const validateFormData = (data) => {
    let errors = {};
    if (!data.id) errors.id = "ID is required";
    if (!data.name) errors.name = "Name is required";
    if (!data.description) errors.description = "Description is required";
    if (!data.location) errors.location = "Location is required";
    if (!data.manufacturer) errors.manufacturer = "Manufacturer is required";
    if (!data.modelNumber) errors.modelNumber = "Model Number is required";
    if (!data.serialNumber) errors.serialNumber = "Serial Number is required";
    if (!data.installationDate) errors.installationDate = "Installation Date is required";
    if (!data.lastMaintenanceDate) errors.lastMaintenanceDate = "Last Maintenance Date is required";
    if (!data.status) errors.status = "Status is required";
    if (!data.specifications.power) errors.power = "Power is required";
    if (!data.specifications.voltage) errors.voltage = "Voltage is required";
    if (!data.specifications.current) errors.current = "Current is required";
    if (!data.specifications.speed) errors.speed = "Speed is required";
    return errors;
  };

  return (
    <div>
      <button type="button" className="btn btn-lg btn-dark" data-toggle="modal" data-target="#exampleModalCenter">
        + Add an Asset
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add Asset</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} method='post' action='/addasset'>
                <h2 className='text-center'>Add Asset Form</h2>
                <div>
                  <label>ID:</label>
                  <input type="text" name="id" value={formData.id} onChange={handleChange} />
                  {errors.id && <span className="error">{errors.id}</span>}
                </div>
                <div>
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                  <label>Description:</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} />
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <div>
                  <label>Location:</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} />
                  {errors.location && <span className="error">{errors.location}</span>}
                </div>
                <div>
                  <label>Manufacturer:</label>
                  <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                  {errors.manufacturer && <span className="error">{errors.manufacturer}</span>}
                </div>
                <div>
                  <label>Model Number:</label>
                  <input type="text" name="modelNumber" value={formData.modelNumber} onChange={handleChange} />
                  {errors.modelNumber && <span className="error">{errors.modelNumber}</span>}
                </div>
                <div>
                  <label>Serial Number:</label>
                  <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
                  {errors.serialNumber && <span className="error">{errors.serialNumber}</span>}
                </div>
                <div>
                  <label>Installation Date:</label>
                  <input type="date" name="installationDate" value={formData.installationDate} onChange={handleChange} />
                  {errors.installationDate && <span className="error">{errors.installationDate}</span>}
                </div>
                <div>
                  <label>Last Maintenance Date:</label>
                  <input type="date" name="lastMaintenanceDate" value={formData.lastMaintenanceDate} onChange={handleChange} />
                  {errors.lastMaintenanceDate && <span className="error">{errors.lastMaintenanceDate}</span>}
                </div>
                <div>
                  <label>Status:</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="Operational">Operational</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Cleared">Cleared</option>
                  </select>
                  {errors.status && <span className="error">{errors.status}</span>}
                </div>
                <div>
                  <label>Power:</label>
                  <input type="text" name="power" value={formData.specifications.power} onChange={handleSpecificationChange} />
                  {errors.power && <span className="error">{errors.power}</span>}
                </div>
                <div>
                  <label>Voltage:</label>
                  <input type="text" name="voltage" value={formData.specifications.voltage} onChange={handleSpecificationChange} />
                  {errors.voltage && <span className="error">{errors.voltage}</span>}
                </div>
                <div>
                  <label>Current:</label>
                  <input type="text" name="current" value={formData.specifications.current} onChange={handleSpecificationChange} />
                  {errors.current && <span className="error">{errors.current}</span>}
                </div>
                <div>
                  <label>Speed:</label>
                  <input type="text" name="speed" value={formData.specifications.speed} onChange={handleSpecificationChange} />
                  {errors.speed && <span className="error">{errors.speed}</span>}
                </div>
                <button className='btn btn-success' type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
