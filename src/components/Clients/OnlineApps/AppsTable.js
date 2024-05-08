import React from 'react';
import { Pager, Fetcher } from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Application from './Application';

function AppsTable({appsData, params, setAppsData, setAppId, appId}) {
  const handleClick = (e) => setAppId(e.target.id);

  return (
    <>
      <TableHeader appsData={appsData} params={params} setAppsData={setAppsData}/>
      {appId ?
        <div style={{padding:'0', border:'none'}} className='table-container journal__table font-12'>
          <div className='table-responsive journal__table-container-journals'>
            <MiniTable apps={appsData.apps} handleClick={handleClick} appId={appId}/>
            <Fetcher urls={[`/clientsapi/application/${appId}/`]} extra={{close}}>
              {({data}) => <Application appData={data[0]} setAppId={setAppId}/>}
            </Fetcher>
          </div>
        </div> :
        <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
          <div className='table-responsive full__table'>
            <MainTable appsData={appsData} handleClick={handleClick}/>
          </div>
        </div>}
    </>
  )
}

const TableHeader = ({appsData, params, setAppsData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={appsData.next_page_num} params={params} prevPageNumber={appsData.prev_page_num} setData={setAppsData}/>
        <div style={{marginTop:'6px'}}>Showing {appsData.apps.length} of {appsData.count} clients.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {appsData.number} of {appsData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='applications'
            filename='online applications'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const MainTable = ({appsData, handleClick}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='applications'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Full_Name</th>
                  <th style={{textAlign:'start'}}>Type_Of_Client</th>
                  <th style={{textAlign:'start'}}>ID Number</th>
                  <th style={{textAlign:'start'}}>Contact</th>
                  <th style={{textAlign:'start'}}>Gender</th>
                  <th style={{textAlign:'start'}}>Date_Of_Birth</th>
                  <th style={{textAlign:'start'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {appsData.apps.map(app => {
                  return (
                    <tr key={app.id}>
                      <td>
                        <span onClick={handleClick} id={app.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          {app.fullname}
                        </span>
                      </td>
                      <td>{app.ctype}</td>
                      <td>{app.identification_number}</td>
                      <td>{app.phone_number}</td>
                      <td>{app.gender}</td>
                      <td>{app.dob} <em>({app.age_year} years, {app.age_month} month(s))</em></td>
                      <td>{app.status}</td>
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

const MiniTable = ({apps, handleClick, appId}) => {
  return (
    <div>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='applications'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Full_Name</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(app => {
                  return (
                    <tr key={app.id}>
                      <td>
                        <span onClick={handleClick} id={app.id} style={{fontSize:'0.75rem', cursor:'pointer', ...(appId == app.id && {color: 'red'})}} className='link'>
                          {app.fullname}
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

export default AppsTable;