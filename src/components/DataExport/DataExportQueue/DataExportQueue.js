import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import DataExport from './DataExport';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function DataExportQueue({exportsList}) {
  const [expId, setExpId] = useState(null);
  const handleClick = (e) => setExpId(e.target.id);
  const close = () => setExpId(null);

  return (
    <>
      <TableHeader/>
      {expId ?
        <div style={{padding:'0', border:'none'}} className='table-container journal__table font-12'>
          <div className='table-responsive journal__table-container-journals'>
            <MiniTable exportsList={exportsList} handleClick={handleClick} expId={expId}/>
            <Fetcher urls={[`/reportsapi/get_export/${expId}/`]}>
              {({data}) => <DataExport data={data[0]} close={close}/>}
            </Fetcher>
          </div>
        </div> :
        <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
          <div className='table-responsive full__table'>
            <MainTable exportsList={exportsList} handleClick={handleClick}/>
          </div>
        </div>}
    </>
  )
}

const TableHeader = () => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='exports'
            filename='exports'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const MiniTable = ({exportsList, handleClick, expId}) => {
  return (
    <div>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='exports'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Name</th>
                </tr>
              </thead>
              <tbody>
                {exportsList.map(exp => {
                  return (
                    <tr key={exp.id}>
                      <td>
                        <span onClick={handleClick} id={exp.id} style={{fontSize:'0.75rem', cursor:'pointer', ...(expId == exp.id && {color: 'red'})}} className='link'>
                          {exp.data_export_name}
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

const MainTable = ({exportsList, handleClick}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='exports'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Name</th>
                  <th style={{textAlign:'start'}}>Entity</th>
                  <th style={{textAlign:'start'}}>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {exportsList.map(exp => {
                  return (
                    <tr key={exp.id}>
                      <td><span onClick={handleClick} id={exp.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{exp.data_export_name}</span></td>
                      <td>{exp.base_entity}</td>
                      <td>{exp.date_created}</td>
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

export default DataExportQueue;
