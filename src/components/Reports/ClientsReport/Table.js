import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';
import { REPORT_FIELDS } from '../ReportFields/data';

const Table = ({ clientsReportData, params, templates, setClientsReportData }) => {
  const template = templates.find(obj => obj.id == params.get('report_template_id'));
  const columns = template ? template.columns : Object.keys(REPORT_FIELDS.CLIENTS_REPORT);

  return (
    <>
      <TableHeader clientsReportData={clientsReportData} params={params} setClientsReportData={setClientsReportData}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='clients-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                {columns.map((column, index) => (
                  <th key={index} style={{textAlign:'right'}}>
                    {REPORT_FIELDS.CLIENTS_REPORT[column]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsReportData.clients.map(client => {
                return (
                  <tr key={client.id}>
                    {columns.map((column, index) => (
                      <td key={index} style={{textAlign:'right'}}>
                        {client[column]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const TableHeader = ({clientsReportData, params, setClientsReportData }) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={clientsReportData.next_page_num}
          params={params}
          prevPageNumber={clientsReportData.prev_page_num}
          setClientsReportData={setClientsReportData}
        />
        <div style={{marginTop:'6px'}}>Showing {clientsReportData.clients.length} of {clientsReportData.count} clients.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {clientsReportData.number} of {clientsReportData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='clients-report'
            filename='clients-report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setClientsReportData, params}) => {
  const [errors, setErrors] = React.useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/clients-report/', {params: params});
      setClientsReportData(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br/></>}
      {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button>: null}
    </div>
  )
}

export default Table;
