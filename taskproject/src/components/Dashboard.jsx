import React from 'react'
import '../styles/Dashboard.css'
import {motorAssets} from '../data/MotorAssets'

export default function Dashboard() {

  //Asset Example: Motor
// 1. Motor ID: MTR-001

// 2. Name: Main Conveyor Motor
// 3. Description: Motor used to drive the main conveyor belt in the production line.
// 4. Location: Factory Floor A - Section B
// 5. Manufacturer: ACME Motors
// 6. Model Number: ACM1234
// Serial Number: SN-987654321
// Installation Date: 2021-08-15
// Last Maintenance Date: 2023-03-10
// Status: Operational
// Specifications:
// • Power: 15 kW
// • Voltage: 400V
// • Current: 35A
// • Speed: 1500 RPM

  // const motorAssets = [
  //   { id: 'MTR-001', 
  //     name: 'Main Conveyor Motor', 
  //     description:'Motor used to drive the main conveyor belt in the production line.',
  //     Location: 'Factory Floor A - Section B',
  //     Manufacturer: 'ACME Motors' ,
  //     ModelNumber: 'ACM1234' ,
  //     SerialNumber: 'SN-987654321',
  //     InstallationDate: '2021-08-15' ,
  //     LastMaintenanceDate: '2023-03-10',
  //     status: 'Operational', 
  //     lastMaintenance: '2024-05-10' ,
  //     Specifications :[
  //       {power : '15KW'} ,
  //       {Voltage: '400V'},
  //       {Current: '35A'},
  //       {Speed: '1500 RPM'}
  //     ]
  //   },
  //   { id: 2, name: 'Motor B', status: 'Maintenance Required', lastMaintenance: '2024-04-22' },
  //   { id: 3, name: 'Motor C', status: 'Operational', lastMaintenance: '2024-05-15' },
  // ];

  const keyMetrics = {
    totalAssets: 50,
    operational: 45,
    underMaintenance: 5,
  };

  const recentActivities = [
    { id: 1, description: 'Motor A underwent routine maintenance', date: '2024-05-10' },
  ];


  return (
    <>
      <div className="containerr">
        
        <div className="row mb-3">
          <div className="col">
            <h1>Welcome to your Dashboard</h1>
            <p>Here is an overview of all motor assets and recent activities.</p>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Total Motor Assets</h5>
                <p className="card-text">
                  {keyMetrics.totalAssets}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Operational Motors</h5>
                <p className="card-text">
                  {keyMetrics.operational}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Motors Under Maintenance</h5>
                <p className="card-text">
                  {keyMetrics.underMaintenance}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h3>Motor Assets Overview</h3>
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Manufacturer</th>
                  <th>Model Number</th>
                </tr>
              </thead>
              <tbody>
                {motorAssets.map(asset => (
                  <tr key={asset.id}>
                    <td>{asset.id}</td>
                    <td>{asset.name}</td>
                    <td>{asset.description}</td>
                    <td>{asset.Location}</td>
                    <td>{asset.Manufacturer}</td>
                    <td>{asset.ModelNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>Serial Number</th>
                  <th>Installation Date</th>
                  <th>Last Maintenance Date</th>
                  <th>Status</th>
                  <th>Specifications</th>
                </tr>
              </thead>
              <tbody>
                {motorAssets.map(asset => (
                  <tr key={asset.id}>
                    <td>{asset.SerialNumber}</td>
                    <td>{asset.InstallationDate}</td>
                    <td>{asset.LastMaintenanceDate}</td>
                    <td>{asset.status}</td>
                    <td>
                        <ul>
                          {asset.Specifications.map((specificaion,index) => (
                            <li key={index}>
                              {Object.keys(specificaion)} : {Object.values(specificaion)}
                            </li>
                          ))}
                        </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h3>Recent Activities</h3>
            <ul className="list-group">
              {recentActivities.map(activity => (
                <li key={activity.id} className="list-group-item">
                  {activity.description} <span className="text-muted">({activity.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
