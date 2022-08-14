import React from 'react';

function FilesOverview({uploadedFilesList}) {
  return (
    <div className='form-group row text-light' style={{marginTop: '1.5rem'}}>
      <label className='col-sm-1 control-label'>File List</label>
      <table className='table table-bordered table-head-fixed text-nowrap' id='chart' width='100%'>
        <thead>
          <tr className="journal-details header">
            <th>File Name</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFilesList.length > 0 ? uploadedFilesList.map((file, idx) => 
          (<tr key={idx}>
            <td>{file.name}</td>
          </tr>)) : <tr><td colSpan={9} style={{textAlign: 'center'}}>No data in table.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default FilesOverview;