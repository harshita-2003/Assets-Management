import React, { useState } from 'react';
import Env from '../Env';
import '../styles/ViewAsset.css'

export default function UpdateAsset({ asset, onClose, onUpdate }) {
    const [updatedAsset, setUpdatedAsset] = useState({ ...asset });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAsset(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Env.URL}/updateasset/${asset._id}`, {
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
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="updateAssetModalTitle" aria-hidden="true">
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
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" id="description" name="description" value={updatedAsset.description} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={updatedAsset.location} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input type="text" className="form-control" id="manufacturer" name="manufacturer" value={updatedAsset.manufacturer} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="installationDate">InstallationDate</label>
                                <input type="text" className="form-control" id="installationDate" name="installationDate" value={updatedAsset.installationDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastMaintenanceDate">LastMaintenanceDate</label>
                                <input type="text" className="form-control" id="lastMaintenanceDate" name="lastMaintenanceDate" value={updatedAsset.lastMaintenanceDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <input type="text" className="form-control" id="status" name="status" value={updatedAsset.status} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
