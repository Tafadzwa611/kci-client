import React, {useState} from 'react';
import axios from 'axios';
import DeleteTransfer from '../ViewTransfers/DeleteTransfer';
import Files from './Files';


function TransferDetails({transferId}) {
  const [transfer, setTransfer] = React.useState(null);
  const [deleteTransfer, setDeleteTransfer] = React.useState(false);

  React.useEffect(() => {
    async function fetchTransfer() {
      try {
        const response = await axios.get(`/acc-api/get_transfer/${transferId}/`);
        setTransfer(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTransfer();
  }, []);

  if (!transfer) {
    return <div>Loading...</div>
  }

  return (
      <div id='loan-details'>
        {deleteTransfer && (
          <DeleteTransfer
            setOpen={setDeleteTransfer}
            transfer={transfer}
          />
        )}
        <div style={{display:'grid', rowGap:'1rem'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>

            <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
              <div className='col-12' style={{display:'flex', justifyContent:'space-between'}}>
                <div className='row' style={{marginBottom: '1rem', marginTop: '0', display: 'flex', justifyContent: 'flex-end', columnGap: '5px'}}>
                  <button className='btn btn-olive' onClick={() => setDeleteTransfer(true)}>Delete</button>
                </div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

              {/* LEFT */}
              <div style={{ width: '30%' }}>
                <ul>
                  <li><strong>Transfer ID:</strong> {transfer.id}</li>
                  <li><strong>Transfer Type:</strong> {transfer.transfer_type?.name}</li>
                  <li><strong>Amount:</strong> {transfer.amount}</li>
                  <li><strong>Status:</strong> {transfer.status}</li>
                </ul>
              </div>

              {/* CENTER */}
              <div style={{ width: '30%', display: 'flex', justifyContent: 'center' }}>
                <ul>
                  <li><strong>Reference:</strong> {transfer.reference || '-'}</li>
                  <li><strong>Date Created:</strong> {transfer.db_date_created}</li>
                  <li><strong>Created By:</strong> {transfer.created_by?.name}</li>
                </ul>
              </div>

              {/* RIGHT */}
              <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                <ul>
                  <li><strong>Transfer Date:</strong> {transfer.date_added}</li>
                  <li><strong>Description:</strong> {transfer.description}</li>
                  <li><strong>From Branch:</strong> {transfer.sending_branch?.name}</li>
                  <li><strong>To Branch:</strong> {transfer.receiving_branch?.name}</li>
                </ul>
              </div>

            </div>
          </div>
          <div>
            <Files 
              transfer={transfer}
              setTransfer={setTransfer}
            />
          </div>
        </div>
      </div>
  )
}

export default TransferDetails;