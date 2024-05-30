import React from 'react'
import '../styles/Dashboard.css'


export default function Dashboard(props) {

  const recentActivities = [
    { id: 1, description: 'Motor A underwent routine maintenance', date: '2024-05-10' },
    { id: 2, description: 'Motor B reported an issue', date: '2024-04-22' },
    { id: 3, description: 'Motor C underwent routine maintenance', date: '2024-05-15' },
  ];

  const assetsLength = props.assets ? props.assets.length : 0;

  const assetundermaintenance= props.assets ?  props.assets.filter(asset => asset.status ==='Under Maintenance').length : 0 

  const assetoperational = props.assets? props.assets.filter(asset => asset.status === 'Operational').length : 0

  const issueLength = props.tickets ? props.tickets.length : 0;

  const maintenancedone= props.tickets ? props.tickets.filter(ticket => ticket.status==='Closed').length : 0

  return (
    <>
      <div className="containerr">
        
        <div className="row mb-2">
          <div className="col">
            <h1>Welcome to your Dashboard</h1>
            <p>Here is an overview of all motor assets and recent activities.</p>
          </div>
        </div>
        
        <div className="row ">
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Total Motor Assets</h5>
                <p className="card-text">
                  {assetsLength}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Operational Motors</h5>
                <p className="card-text">
                  {assetoperational}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Motors Under Maintenance</h5>
                <p className="card-text">
                  {assetundermaintenance}
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="row mb-3">
          
          <div className="col-md-6">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Issues reported</h5>
                <p className="card-text">
                  {issueLength}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Maintenance Done</h5>
                <p className="card-text">
                  {maintenancedone}
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="row mb-4">
          <div className="col">
            <h3>Recent Activities</h3>
            <ul className="list-group">
              {recentActivities.map(activity => (
                <li key={activity.id} className="list-group-item">
                  {activity.description} <span className="text-muted float-right">({activity.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>




        <h3>Motor Assets Overview</h3>
        <div className="row mb-4 d-flex">
            
          {props.assets.map(element => (
            <div className="col-md-4 mb-2" key={element.id}>
              <div className="card custom-card">
                <div className="card-body" >
                  <h5 className="card-title" >{element.id}</h5>
                  <p className="card-text">{element.description}</p>
                </div>
              </div>
            </div>
          ))}
            
          </div>
        
        



      </div>
    </>
  )
}
