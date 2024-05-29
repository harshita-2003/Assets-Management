import React from 'react';
import '../styles/ViewAsset.css'

export default function ViewAsset({ asset, onClose }) {
  if (!asset) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="viewAssetModalTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="viewAssetModalTitle">Asset Details</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {asset.id}</p>
            <p><strong>Name:</strong> {asset.name}</p>
            <p><strong>Description:</strong> {asset.description}</p>
            <p><strong>Location:</strong> {asset.location}</p>
            <p><strong>Manufacturer:</strong> {asset.manufacturer}</p>
            <p><strong>Model Number:</strong> {asset.modelNumber}</p>
            <p><strong>Serial Number:</strong> {asset.serialNumber}</p>
            <p><strong>Installation Date:</strong> {asset.installationDate}</p>
            <p><strong>Last Maintenance Date:</strong> {asset.lastMaintenanceDate}</p>
            <p><strong>Status:</strong> {asset.status}</p>
            <h6>Specifications:</h6>
            <p><strong>Power:</strong> {asset.specifications.power} kW</p>
            <p><strong>Voltage:</strong> {asset.specifications.voltage} V</p>
            <p><strong>Current:</strong> {asset.specifications.current} A</p>
            <p><strong>Speed:</strong> {asset.specifications.speed} RPM</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
