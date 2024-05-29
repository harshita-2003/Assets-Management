import React from 'react'
import '../styles/Dashboard.css'


export default function Dashboard(props) {

  const keyMetrics = {
    totalAssets: 50,
    operational: 45,
    underMaintenance: 5,
  };

  const recentActivities = [
    { id: 1, description: 'Motor A underwent routine maintenance', date: '2024-05-10' },
    { id: 2, description: 'Motor B reported an issue', date: '2024-04-22' },
    { id: 3, description: 'Motor C underwent routine maintenance', date: '2024-05-15' },
  ];


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

        
        <div className="row mb-3">
          
          <div className="col-md-6">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Issues reported</h5>
                <p className="card-text">
                  0
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title">Maintenance Done</h5>
                <p className="card-text">
                  45
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
                  {activity.description} <span className="text-muted">({activity.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>




        <h3>Motor Assets Overview</h3>
        <div className="row mb-4 d-flex">
            
          {props.assets.map(element => (
            <div className="col-md-4 mb-2">
              <div className="card custom-card">
                <div className="card-body" key={element.id}>
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
