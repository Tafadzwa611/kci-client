import React, {useState} from 'react';
import { makeRequest } from '../../../utils/utils';


const SIGNED_URL = '/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files';
function FileUploader({setFileName}) {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const changeHandler = (event) => {
        const file = event.target.files.item(0);
            setFile(file);
        };

    async function startUpload (evt) {
        evt.preventDefault();
        setUploading(true);
        const response = await makeRequest.get(SIGNED_URL, {timeout: 80000});
        const uploadData = await response.json();
        await uploadFile(file, uploadData.url, setProgress);
        setFileName(uploadData.filename);
        setProgress(0);
        setUploading(false);
    }

    return (
        <div style={{display:"flex", columnGap:"2rem", alignItems:"center"}}>
            <input type='file' name='file' id='selectedFile' onChange={changeHandler} style={{display: 'none'}}/>
            <div>
                <button type='button' className='btn btn-success' style={{display:"flex", columnGap:"5px", alignItems:"center"}} onClick={e => document.getElementById('selectedFile').click()}>
                    <i className='fas fa-folder-open'/> 
                    <span>Browse...</span>
                </button>
            </div>
            {file != null && <div className='table-responsive p-0' style={{marginTop: '1rem', display:"flex", columnGap:"2rem", alignItems:"center"}}>
                {file.name}
                {bytesToSize(file.size)}
                <input type='button' value={uploading ? 'Uploading...': 'Upload...'} onClick={startUpload}/>
                {uploading && `${progress}% uploaded`}
            </div>}
        </div>
    )
}


const uploadFile = (file, url, setProgress) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url);

        xhr.onload = () => {
            res();
        }

        xhr.onerror = (evt) => rej(evt);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable){
                const percentage = (event.loaded/event.total)*100;
                setProgress(Math.round(percentage));
            }
        }

        const blob = new Blob([file], { type: 'mimeType' });
        xhr.send(blob);
    })
    }

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export default FileUploader;