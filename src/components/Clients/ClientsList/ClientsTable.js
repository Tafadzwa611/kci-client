import React from 'react';
import Client from '../ClientsDetails/Client';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Fetcher } from '../../../common';
import Pager from './Pager';

function ClientsTable({clientId, setClientId, clientsData, params, setClientsData}) {
  const handleClick = (e) => setClientId(e.target.id);
  const close = () => setClientId(null);

  return (
    <>
      <TableHeader clientsData={clientsData} setClientsData={setClientsData} params={params}/>
      {clientId ?
        <div style={{padding:'0', border:'none'}} className='table-container journal__table font-12'>
          <div className='table-responsive journal__table-container-journals'>
            <MiniTable clients={clientsData.clients} handleClick={handleClick} clientId={clientId}/>
            <Fetcher urls={[`/clientsapi/get_client/${clientId}/`]} extra={{close}}>
              {({data, extra}) => <Client clientData={data[0]} close={extra.close}/>}
            </Fetcher>
          </div>
        </div> :
        <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
          <div className='table-responsive full__table'>
            <MainTable clientsData={clientsData} handleClick={handleClick}/>
          </div>
        </div>}
    </>
  )
}

const TableHeader = ({clientsData, params, setClientsData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={clientsData.next_page_num}
          params={params}
          loadMoreClients={() => console.log('loadMoreClients')}
          loadingMore={false}
          prevPageNumber={clientsData.prev_page_num}
          setClientsData={setClientsData}
        />
        <div style={{marginTop:'6px'}}>Showing {clientsData.clients.length} of {clientsData.count} clients.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {clientsData.number} of {clientsData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='clients'
              filename='clients'
              sheet='tablexls'
              buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const MiniTable = ({clients, handleClick, clientId}) => {
  return (
    <div>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='clients'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Full_Name</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => {
                  return (
                    <tr key={client.id}>
                      <td>
                        <span onClick={handleClick} id={client.id} style={{fontSize:'0.75rem', cursor:'pointer', ...(clientId == client.id && {color: 'red'})}} className='link'>
                          {client.fullname}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const MainTable = ({clientsData, handleClick}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='clients'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Client_Number</th>
                  <th style={{textAlign:'start'}}>Full_Name</th>
                  <th style={{textAlign:'start'}}>Type_Of_client</th>
                  <th style={{textAlign:'start'}}>Contact</th>
                  <th style={{textAlign:'start'}}>Gender</th>
                  <th style={{textAlign:'start'}}>Registration_Date</th>
                  <th style={{textAlign:'start'}}>Date_Of_Birth</th>
                  <th style={{textAlign:'start'}}>Branch</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.clients.map(client => {
                    return (
                      <tr key={client.id}>
                        <td><span onClick={handleClick} id={client.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{client.client_id}</span></td>
                        <td>{client.fullname}</td>
                        <td>{client.type_of_client}</td>
                        <td>{client.phone_number}</td>
                        <td>{client.gender}</td>
                        <td>{client.db_registration_date}</td>  
                        <td>{client.db_date_of_birth} <em>(Age in years)</em></td>
                        <td>{client.branch_name}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientsTable;
