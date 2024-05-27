import React, { useState } from 'react';
import AddAssetModal from './AddAsset';
import Env from '../Env';
import ViewAsset from './ViewAsset';
import UpdateAsset from './UpdateAsset';

export default function Assets(props) {

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [updateAsset, setUpdateAsset] = useState(null);

  //to delete an asset
  async function handledelete(e) {
    try {

      let assetId = e.target.value;
      let result = await fetch(`${Env.URL}/deleteasset/${assetId}` , {
        method : 'DELETE',
      });
      let finalResult = await result.json();
      console.log(finalResult)
      props.getData();

    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  function handleView(asset){
    setSelectedAsset(asset);
  }

  function handleCloseModal() {
    setSelectedAsset(null);
  }

  function handleUpdate(asset) {
    setUpdateAsset(asset);
  }

  function handleCloseUpdateModal() {
    setUpdateAsset(null);
  }

  function handleUpdateAsset(updatedAsset) {
      props.getData();    //refresh to render the changes
      setUpdateAsset(null);
  }


  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h3>Motor Assets Overview</h3>
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Installation Date <br />(yyyy-mm-dd)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.assets.map(asset => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.installationDate}</td>
                  <td>{asset.status}</td>
                  <td>
                  <div className='d-flex'>
                      <button className='btn btn-danger mx-1' onClick={handledelete} value={asset._id}>Delete</button>
                      <button className='btn btn-primary mx-1' onClick={() => handleUpdate(asset)}>Update</button>
                      <button className='btn btn-success mx-1' onClick={() => handleView(asset)} value={asset._id}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <AddAssetModal />

      {selectedAsset && <ViewAsset asset={selectedAsset} onClose={handleCloseModal} />}
      {updateAsset && <UpdateAsset asset={updateAsset} onClose={handleCloseUpdateModal} onUpdate={handleUpdateAsset} />}
    </>
  );
}
