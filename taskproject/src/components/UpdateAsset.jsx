import React, { useState } from 'react';
import '../styles/ViewAsset.css'
import { baseUrl } from '../Url';

export default function UpdateAsset({ asset, onClose, onUpdate }) {
    const [updatedAsset, setUpdatedAsset] = useState({ ...asset });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAsset(prevState => ({ ...prevState, [name]: value }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateFormData(updatedAsset);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`${baseUrl}/updateasset/${asset._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAsset),
                });
                const result = await response.json();
                if (response.ok) {
                    onUpdate(result);
                    onClose();
                } else {
                    console.error('Error updating asset:', result);
                }
            } catch (error) {
                console.error('Error updating asset:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="updateAssetModalTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateAssetModalTitle">Update Asset</h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{"max-height": '80vh',"overflow-y": 'auto'}}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={updatedAsset.name} onChange={handleChange} />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" id="description" name="description" value={updatedAsset.description} onChange={handleChange} />
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={updatedAsset.location} onChange={handleChange} />
                                {errors.location && <span className="error">{errors.location}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input type="text" className="form-control" id="manufacturer" name="manufacturer" value={updatedAsset.manufacturer} onChange={handleChange} />
                                {errors.manufacturer && <span className="error">{errors.manufacturer}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="installationDate">Installation Date</label>
                                <input type="date" className="form-control" id="installationDate" name="installationDate" value={updatedAsset.installationDate} onChange={handleChange} />
                                {errors.installationDate && <span className="error">{errors.installationDate}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastMaintenanceDate">Last Maintenance Date</label>
                                <input type="date" className="form-control" id="lastMaintenanceDate" name="lastMaintenanceDate" value={updatedAsset.lastMaintenanceDate} onChange={handleChange} />
                                {errors.lastMaintenanceDate && <span className="error">{errors.lastMaintenanceDate}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select name="status" id="status" className="form-control" value={updatedAsset.status} onChange={handleChange}>
                                    <option value="">Select Status</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Under Maintenance">Under Maintenance</option>
                                    <option value="Cleared">Cleared</option>
                                </select>
                                {errors.status && <span className="error">{errors.status}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="power">Power</label>
                                <input type="text" className="form-control" id="power" name="power" value={updatedAsset.specifications?.power || ""} onChange={handleChange} />
                                {errors.power && <span className="error">{errors.power}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="voltage">Voltage</label>
                                <input type="text" className="form-control" id="voltage" name="voltage" value={updatedAsset.specifications?.voltage || ""} onChange={handleChange} />
                                {errors.voltage && <span className="error">{errors.voltage}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="current">Current</label>
                                <input type="text" className="form-control" id="current" name="current" value={updatedAsset.specifications?.current || ""} onChange={handleChange} />
                                {errors.current && <span className="error">{errors.current}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="speed">Speed</label>
                                <input type="text" className="form-control" id="speed" name="speed" value={updatedAsset.specifications?.speed || ""} onChange={handleChange} />
                                {errors.speed && <span className="error">{errors.speed}</span>}
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
