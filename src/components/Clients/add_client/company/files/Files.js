import React, { useEffect } from 'react';
import SingleFile from './SingleFile';

function Files({selectedFiles, setSelectedFiles, uploadedFilesList, setUploadedFilesList, setTab}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeHandler = (event) => {
    let newFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files.item(i);
      if (selectedFiles.filter(selectedFile => selectedFile.file.name === file.name).length > 0) {
        newFiles.push({id: uuidv4(), file: file, ok: false, reason: 'A file with this name has already been added.'});
      }else if (file.size > 10485760) {
        newFiles.push({id: uuidv4(), file: file, ok: false, reason: 'File size exceeds the 10MB limit.'});
      }else {
        newFiles.push({id: uuidv4(), file: file, ok: true});
      }
    }
    event.target.value = '';
		setSelectedFiles(curr => [...curr, ...newFiles]);
	};

  return (
    <>
      <div className='text-light'>
        <input type='file' name='file' id="selectedFile" onChange={changeHandler} multiple style={{display: 'none'}}/>
        <div className='row' style={{margin: '15px 0'}}>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='btn btn-success' onClick={e => document.getElementById('selectedFile').click()}>
                  <i className='fas fa-folder-open'/>
                  Browse...
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="table-container busines_files">
            <div className='table-responsive'>
                <table className='table' id='chart' style={{width:"100%"}}>
                    <thead>
                    <tr className="business_files_thead">
                        <th>File Name</th>
                        <th>File Size</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedFiles.length > 0 ?
                        selectedFiles.map((file_obj, idx) => 
                        <SingleFile key={idx} file_obj={file_obj} uploadedFilesList={uploadedFilesList} setSelectedFiles={setSelectedFiles} setUploadedFilesList={setUploadedFilesList}/>) :
                        <tr className="business_files_body" style={{borderTop:"0"}}><td colSpan={3} style={{textAlign: 'center'}}>No selected files.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('bnk')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('coverview')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default Files;