import React, { useEffect } from 'react';
import { uuidv4 } from '../utils';
import SingleFile from './SingleFile';

function Files({files, setFiles, clientId}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeHandler = (event) => {
    let newFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files.item(i);
      console.log(file);
      if (file.size > 10485760) {
        newFiles.push({name: file.name, file: file, ok: false, uuid: uuidv4(), reason: 'File size exceeds the 10MB limit.'});
      }else {
        newFiles.push({name: file.name, file: file, ok: true, uuid: uuidv4()});
      }
    }
    event.target.value = '';
		setFiles(curr => [...curr, ...newFiles]);
	};

  return (
    <>
      <div className='card-body' style={{marginTop: '15px'}}>
        <input type='file' name='file' id="selectedFile" onChange={changeHandler} multiple style={{display: 'none'}}/>
        <div className='row'>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='button button-success' onClick={e => document.getElementById('selectedFile').click()}>
                  <i className='fas fa-folder-open'/>
                  Browse...
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body table-responsive p-0' style={{marginTop: '15px'}}>
          <table className='table table-bordered table-head-fixed text-nowrap' width='100%'>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ?
                files.map((fileObj, idx) => <SingleFile key={idx} files={files} fileObj={fileObj} setFiles={setFiles} clientId={clientId}/>) :
                <tr><td colSpan={3} style={{textAlign: 'center'}}>No selected files.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Files;