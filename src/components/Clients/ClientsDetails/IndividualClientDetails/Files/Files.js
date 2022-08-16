
import React, { useEffect } from 'react';
import SingleFile from './SingleFile';

function Files({files, setFiles, clientId}) {

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
            <div>
                <input type='file' name='file' id="selectedFile" onChange={changeHandler} multiple style={{display: 'none'}}/>
                <div style={{marginBottom:"1.5rem"}}>
                    <button type='button' className='btn btn-success' onClick={e => document.getElementById('selectedFile').click()}>
                        <i className='fas fa-folder-open'/>
                        Browse...
                    </button>
                </div>
                <table className='table'>
                    <thead>
                        <tr className="journal-details header">
                            <th style={{paddingLeft:"0"}}>File Name</th>
                            <th style={{paddingLeft:"0"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ?
                            files.map((fileObj, idx) => <SingleFile key={idx} files={files} fileObj={fileObj} setFiles={setFiles} clientId={clientId}/>) :
                            <tr><td colSpan={3} style={{textAlign: 'center'}}>No selected files.</td></tr>}
                    </tbody>
                </table>
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