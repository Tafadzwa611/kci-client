import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DataExport({data, close}) {
  const [error, setError] = useState(null);
  const [dataExport, setDataExport] = useState(data);

  useEffect(() => {
    if (dataExport.status === 'Completed' || dataExport.status === 'Failed')return;
    let interval = setInterval(async () => {
      const response = await axios.get(`/reportsapi/get_export/${dataExport.id}/`);
      setDataExport(response.data);
      if (response.data.status === 'Completed' || response.data.status === 'Failed') {
        clearInterval(interval);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const dowloadFile = async () => {
    setError(null);
    const s3_file_name = `${dataExport.s3_file_name}.${dataExport.data_export_file_format}`;
    const filename = `${dataExport.data_export_name}.${dataExport.data_export_file_format}`;
    const response = await axios.get(`/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${s3_file_name}`);
    const signedUrl = response.data.url;
    axios({
      url: signedUrl,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.log(error);
      setError(true);
    });
  }

  return (
    <div style={{position:'sticky', top:'0', width:'100%'}}>
      <div className='j-details-container' style={{padding:'1.5rem'}}>
        <div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {close ?
            <>
              <button className='btn btn-default client__details' onClick={close}>Close</button>
              <button className='btn btn-default client__details'>
                <Link to={`dataexport/${dataExport.id}`}>Expand</Link>
              </button>
            </>
            : null}
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li>Name: {dataExport.data_export_name}</li>
              <li>File Format: {dataExport.data_export_file_format}</li>
              <li>
                <span style={{marginRight:'5px'}}>
                  Status: {dataExport.status}
                </span>
                {dataExport.status === 'Completed' ?
                <span style={{cursor:'pointer'}} className='badge badge-info' onClick={dowloadFile}>
                  Download
                </span> : null}
                {error ? 'Error downloading' : null}
              </li>
              <li>Entity: {dataExport.base_entity}</li>
              <li>Start Date and Time: {dataExport.started_at}</li>
              <li>Completion Date and Time: {dataExport.completed_at ? dataExport.completed_at : null}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataExport;