const motorAssets = [
    { id: 'MTR-001', 
      name: 'Main Conveyor Motor', 
      description:'Motor used to drive the main conveyor belt in the production line.',
      Location: 'Factory Floor A - Section B',
      Manufacturer: 'ACME Motors' ,
      ModelNumber: 'ACM1234' ,
      SerialNumber: 'SN-987654321',
      InstallationDate: '2021-08-15' ,
      LastMaintenanceDate: '2023-03-10',
      status: 'Operational', 
      Specifications :[
        {Power : '15KW'} ,
        {Voltage: '400V'},
        {Current: '35A'},
        {Speed: '1500 RPM'}
      ]
    }
    // { id: 2, name: 'Motor B', status: 'Maintenance Required', lastMaintenance: '2024-04-22' },
    // { id: 3, name: 'Motor C', status: 'Operational', lastMaintenance: '2024-05-15' },
];


export {motorAssets};