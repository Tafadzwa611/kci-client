import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
};

const thumb = {
  display: 'inline-flex',
  width: 100,
  height: 80,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const PLACEHOLDER_PROFILE_LINK = 'https://cbmstaticfiles.sfo2.cdn.digitaloceanspaces.com/lenda-frontend-files/profile.png';
// const PLACEHOLDER_PROFILE_LINK = 'https://cbmstaticfiles.sfo2.cdn.digitaloceanspaces.com/profile_placeholder/profile.png';


function Profile({client, setClient}) {
  const [fileId, setFileId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    accept: {'image/*': []},
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        const imgElement = document.createElement('img');
        imgElement.src = event.target.result;

        imgElement.onload = async function (e) {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scaleSize = MAX_WIDTH / e.target.width;
          canvas.width = MAX_WIDTH;
          canvas.height = e.target.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL(e.target, 'image/png');
          const blob = await dataURItoBlob(srcEncoded);
          const signedUrl = await axios.get('/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files');
          await uploadFile(blob, signedUrl.data.url, signedUrl.data.filename);
          document.querySelector('#output').src = srcEncoded;
        }
      }
    }
  });

  const uploadFile = (blob, url, fileName) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.onload = () => {
        const postXHR = new XMLHttpRequest();
        postXHR.open('POST', `/clientsapi/add_client_file/${client.id}/`);
        const formData = new FormData();
        formData.append('filename', fileName);
        formData.append('is_profile', true);
        formData.append('description', 'Profile.png');
        formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
        postXHR.send(formData);
        postXHR.onload = () => {
          const jsonResponse = JSON.parse(postXHR.responseText);
          jsonResponse.name = jsonResponse.filename;
          setFileId(jsonResponse.id);
          setClient(curr => ({...curr, files: [...curr.files, jsonResponse]}));
          setProgress(null);
          res();
        }
        postXHR.onerror = (evt) => {
          rej(evt);
        }
      }
      xhr.onerror = (evt) => {
        rej(evt);
      }
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable){
          const percentage = (event.loaded/event.total)*100;
          setProgress(Math.round(percentage));
        }
      }
      xhr.send(blob);
    });
  }

  useEffect(() => {
    const getPhoto = async () => {
      const profile = client.files.find(file => file.is_profile);
      let profileLink = PLACEHOLDER_PROFILE_LINK;
      if (profile) {
        const response = await axios.get(`/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${profile.name}`);
        setFileId(profile.id);
        profileLink = response.data.url;
      }
      document.querySelector('#output').src = profileLink;
    }
    getPhoto();
  }, []);

  const deleteFile = async () => {
    const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
    try {
      await axios.delete(`/clientsapi/delete_file/${fileId}/`, CONFIG);
      setFileId(null);
      document.querySelector('#output').src = PLACEHOLDER_PROFILE_LINK;
      setClient(curr => ({...curr, files: curr.files.filter(file => file.id != fileId)}));
    } catch(error) {
      console.log(error);
    }
  }

  const statusClasses = {
    'Active': 'badge badge-success',
    'Blacklisted': 'badge badge-dark',
    'Processing': 'badge badge-info-lighter',
    'Pending Approval': 'badge badge-info-light',
    'Inactive': 'badge badge-info',
    'Left': 'badge badge-semi-dark',
    'Rejected': 'badge badge-danger',
  }

  return (
    <section>
      <div style={{display:'flex', columnGap:'10px', alignItems:'start'}}>

        <div>
          <aside style={thumbsContainer}>
            <div style={thumb}>
              <div style={thumbInner}>
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                  <img id='output' width='100' height='110'/>
                </ControlledZoom>
              </div>
            </div>
          </aside>
        </div>

        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            <span style={{marginRight:'5px'}}><b>{client.first_name} {client.last_name}</b></span> /
            <span style={{marginLeft:'5px'}} className={statusClasses[client.status]}>{client.status}</span>
          </div>
          <div style={{display:'flex', columnGap:'5px', paddingTop:'10px'}}>
            <div {...getRootProps({className: ''})}>
              <input {...getInputProps()} />
              <p className='badge badge-default'>Add</p>
            </div>
            <div>
              {fileId && <button onClick={deleteFile} className='badge badge-default'>Delete</button>}
              {progress && <div>{progress}%</div>}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

async function dataURItoBlob(dataURI) {
  const response = await fetch(dataURI);
  const blob = response.blob();
  return blob
}

export default Profile;