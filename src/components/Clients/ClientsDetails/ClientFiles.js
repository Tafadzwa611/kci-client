import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';

const Errors = {
  downError: 'downError',
  delError: 'delError',
};
function ClientFiles({client, setClient}) {
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

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
        uploadFile(acceptedFiles[idx], url.data.url, url.data.filename, setProgress);
      })
    );
  }

  const uploadFile = (file, url, fileName, setProgress) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = () => {
        const postXHR = new XMLHttpRequest();
        postXHR.open('POST', `/clientsapi/add_client_file/${client.id}/`);
        const formData = new FormData();
        formData.append('filename', fileName);
        formData.append('description', file.name);
        formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
        postXHR.send(formData);
        postXHR.onload = () => {
          const jsonResponse = JSON.parse(postXHR.responseText);
          setClient(curr => ({...curr, files: [...curr.files, jsonResponse]}));
          setProgress(curr => ({...curr, [file.path]: {...curr[file.path], status: 'Uploaded'}}));
          res();
        }
        postXHR.onerror = (evt) => {
          setProgress(curr => ({...curr, [file.path]: {...curr[file.path], status: 'Failed'}}));
          rej(evt);
        }
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
    }).catch(error => {
      console.log(error);
      setError(Errors.downError);
    });
  }

  const deleteFile = async (evt) => {
    const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
    try {
      await axios.delete(`/clientsapi/delete_file/${evt.target.id}/`, CONFIG);
      setClient(curr => ({...curr, files: curr.files.filter(file => file.id != evt.target.id)}));
    } catch(error) {
      console.log(error);
      setError(Errors.delError);
    }
  }

  return (
    <>
      <div style={{marginBottom: '1rem'}}>
        {client.files.map(file => (
          <div key={file.id} style={{marginBottom: '0.25rem', display:'flex', columnGap:'10px'}}>
            <span>
              {file.description}-{file.user_name}-{file.date_added}
            </span>
            <span style={{cursor:'pointer'}} className='badge badge-info' id={file.name} data-name={file.description} onClick={dowloadFile}>
              Download
            </span>
            {error === Errors.downError ? 'Error downloading' : null}
            <span style={{cursor:'pointer'}} className='badge badge-danger' id={file.id} onClick={deleteFile}>Remove</span>
            {error === Errors.delError ? 'Error deleting' : null}
          </div>
        ))}
      </div>
      <Dropzone onDrop={onDrop}>
        {({acceptedFiles, getRootProps, getInputProps}) => (
          <section className='container'>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className='dropzone__text'>Drag and drop some files here, or click to select files</p>
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

export default ClientFiles;