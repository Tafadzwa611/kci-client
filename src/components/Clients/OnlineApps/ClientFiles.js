import React, { useState } from 'react';
import axios from 'axios';

const Errors = {downError: 'downError'};

function ClientFiles({app}) {
  const [error, setError] = useState(null);

  const dowloadFile = async (evt) => {
    setError(null);
    const response = await axios.get(`/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${evt.target.id}`);
    const signedUrl = response.data.url;
    axios({
      url: signedUrl,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', evt.target.dataset.name);
      document.body.appendChild(link);
      link.click();
    }).catch(() => {
      setError(Errors.downError);
    });
  }

  return (
    <div style={{marginBottom: '1rem'}}>
      {app.file_list.map(file => (
        <div key={file.name} style={{marginBottom: '0.25rem', display:'flex', columnGap:'10px'}}>
          <span>
            {file.description}
          </span>
          <span style={{cursor:'pointer'}} className='badge badge-info' id={file.name} data-name={file.name} onClick={dowloadFile}>
            Download
          </span>
          {error === Errors.downError ? 'Error downloading' : null}
        </div>
      ))}
    </div>
  )
}

export default ClientFiles;