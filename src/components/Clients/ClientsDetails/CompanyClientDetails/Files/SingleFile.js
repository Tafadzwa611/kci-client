
import React, {useState} from 'react';
import { makeRequest } from '../../../../../utils/utils'

function SingleFile({fileObj, clientId, setFiles}) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function startUpload (evt) {
    evt.preventDefault();
    setUploading(true);
    const res = await uploadFile(fileObj.file, setProgress, clientId);
    setUploading(false);
    if (res.is_valid) {
      setFiles(curr => [...curr.filter(currFile => currFile.uuid !== fileObj.uuid), {id: res.id, name: res.name, path: res.path}]);
    }else {
      console.log(res);
      setError(true);
    }
  }

  const removeFile = async () => {
    setUploading(false);
    if (!fileObj.hasOwnProperty('id')) {
      return setFiles(curr => curr.filter(f => f.uuid != fileObj.uuid));
    }
    try {
      const response = await makeRequest.delete(`/clientsapi/delete_file/${fileObj.id}`, {timeout: 8000});
      if (response.ok) {
        setFiles(curr => curr.filter(f => f.id != fileObj.id));
      }
    }catch(error) {
      console.log(error);
    }
  }

  return (
    <tr>
      {fileObj.hasOwnProperty('ok') ? 
      <td style={{backgroundColor: fileObj.ok ? 'white': 'red'}}>{fileObj.name} <b>{fileObj.reason}</b></td> :
      <td><a href={`/media/${fileObj.path}`} download>{fileObj.name}</a></td>}
      <td>
        {!fileObj.hasOwnProperty('id') && <input type='button' value='Upload...' onClick={startUpload} disabled={!fileObj.ok || uploading || error}/>}
        <input type='button' value='Delete...' onClick={removeFile}/>
      </td>
    </tr>
  )
}

const uploadFile = (file, setProgress, clientId) => {
  const url = '/clientsapi/add_client_file/';
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp);
    }

    xhr.onerror = (evt) => rej(evt);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable){
        const percentage = (event.loaded/event.total)*100;
        setProgress(Math.round(percentage));
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('client_id', clientId);
    formData.append('file_name', file.name);
    xhr.send(formData);
  })
}

export default SingleFile;