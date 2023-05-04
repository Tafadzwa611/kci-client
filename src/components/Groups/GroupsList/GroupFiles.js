import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';

const GroupFiles = ({groupId, files, setGroupDetails}) => {
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
        postXHR.open('POST', `/clientsapi/add_group_file/${groupId}/`);
        const formData = new FormData();
        formData.append('filename', fileName);
        formData.append('description', file.name);
        formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
        postXHR.send(formData);
        postXHR.onload = () => {
          const jsonResponse = JSON.parse(postXHR.responseText);
          setGroupDetails(curr => ({...curr, files: [...curr.files, jsonResponse]}));
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
      link.setAttribute('download', evt.target.name);
      document.body.appendChild(link);
      link.click();
    });
  }

  const deleteFile = async (evt) => {
    const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
    try {
      await axios.delete(`/loansapi/delete_loan_file/${evt.target.id}/`, CONFIG);
      setGroupDetails(curr => ({...curr, files: curr.files.filter(file => file.id != evt.target.id)}));
    } catch {
      console.log('error')
    }
  }

  return (
    <>
      <div style={{marginBottom: '1rem'}}>
        {files.map(file => (
          <div key={file.filename} style={{marginBottom: '0.25rem', display:'flex', columnGap:'10px'}}>
            <span>
              {file.description}-{file.user_name}-{file.date_added}
            </span>
            <span className='badge badge-info' id={file.filename} name={file.description} onClick={dowloadFile}>Download</span>
            <span className='badge badge-danger' id={file.id} onClick={deleteFile}>Remove</span>
          </div>
        ))}
      </div>
      <Dropzone onDrop={onDrop}>
        {({acceptedFiles, getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className="dropzone__text">Drag and drop some files here, or click to select files</p>
            </div>
            <aside>
              <p style={{marginTop:"1rem"}}>Files</p>
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

export default GroupFiles;