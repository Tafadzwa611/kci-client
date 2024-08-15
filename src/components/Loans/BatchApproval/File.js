import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

function File({files, setFiles}) {
  const [progress, setProgress] = useState({});

  const onDrop = async (acceptedFiles) => {
    const progress = {};
    acceptedFiles.forEach(file => {
      progress[file.path] = {progress: 0, status: 'In Progress'};
    });
    setProgress(progress);
    const urls = Array(acceptedFiles.length).fill('/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files');
    const signedUrls = await axios.all(urls.map(url => axios.get(url)));
    Promise.all(
      signedUrls.map((url, idx) => {
        console.log(url.data);
        uploadFile(acceptedFiles[idx], url.data.url, url.data.filename, setProgress);
      })
    );
  }

  const uploadFile = (file, url, fileName, setProgress) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = () => {
        setFiles([{name: fileName, description: file.name}]);
      }
      xhr.onerror = (evt) => {
        setProgress(curr => ({...curr, [file.path]: {...curr[file.path], status: 'Failed'}}));
        rej(evt);
      }
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable){
          const percentage = (event.loaded/event.total)*100;
          setProgress(curr => ({...curr, [file.path]: {...curr[file.path], progress: Math.round(percentage)}}));
        }
      }
      const blob = new Blob([file], { type: 'mimeType' });
      xhr.send(blob);
    });
  }

  const deleteFile = async (evt) => {
    setFiles(curr => curr.filter(file => file.name != evt.target.id));
  }

  return (
    <>
      <div style={{marginBottom: '1rem'}}>
        {files.map(file => (
          <div key={file.name} style={{marginBottom: '0.25rem', display:'flex', columnGap:'10px'}}>
            <span>
              {file.description}-{file.user_name}-{file.date_added}
            </span>
            <span style={{cursor:'pointer'}} className='badge badge-danger' id={file.name} onClick={deleteFile}>Remove</span>
          </div>
        ))}
      </div>
      <Dropzone onDrop={onDrop}>
        {({acceptedFiles, getRootProps, getInputProps}) => (
          <section className='container'>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className='dropzone__text'>Drag and drop a file here, or click to select file</p>
            </div>
            <aside>
              <p style={{marginTop:'1rem'}}>Files</p>
              <ul>
                {acceptedFiles.map(file => (
                  <li key={file.path}>
                    {file.path} {progress[file.path].status} {progress[file.path].progress}%
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}
      </Dropzone>
    </>
  )
}

export default File;
