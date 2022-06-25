import React from 'react';

const SingleFile =()=> {
    return (
        <div>Single File</div>
    )
}

export default SingleFile;




// import React, {useState} from 'react';
// import Cookies from 'js-cookie';

// function SingleFile({file_obj, setSelectedFiles, uploadedFilesList, setUploadedFilesList}) {
//   const [progress, setProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const uploaded = uploadedFilesList.findIndex(f => f.id === file_obj.id) != -1;

//   async function startUpload (evt) {
//     evt.preventDefault();
//     setUploading(true);
//     const res = await uploadFile(file_obj.file, setProgress);
//     setUploading(false);
//     if (res.is_valid) {
//       setUploadedFilesList(curr => [...curr, {id: file_obj.id, name: file_obj.file.name, file_id: res.id}]);
//     }else {
//       setError(true);
//     }
//   }

//   const removeFile = () => {
//     setUploading(false);
//     setSelectedFiles(curr => curr.filter(f => f.id != file_obj.id));
//     setUploadedFilesList(curr => curr.filter(f => f.id != file_obj.id));
//   }

//   return (
//     <tr>
//       <td style={{backgroundColor: file_obj.ok ? 'white': 'red'}}>{file_obj.file.name} <b>{file_obj.reason}</b></td>
//       <td>{bytesToSize(file_obj.file.size)}</td>
//       <td style={{display:"flex", columnGap:"5px"}}>
//         <input type='button' value='Upload...' onClick={startUpload} disabled={!file_obj.ok || uploaded || error} style={{background:"#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
//         <input type='button' value='Remove...' onClick={removeFile} style={{background:"#f5424b", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
//         {uploading && `${progress}% uploaded`}
//       </td>
//     </tr>
//   )
// }

// function bytesToSize(bytes) {
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
//   if (bytes === 0) return 'n/a'
//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
//   if (i === 0) return `${bytes} ${sizes[i]})`
//   return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
// }

// const uploadFile = (file, setProgress) => {
//   const url = '/clientsapi/add_image_photo/';
//   return new Promise((res, rej) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', url);
//     xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'));

//     xhr.onload = () => {
//       const resp = JSON.parse(xhr.responseText);
//       res(resp);
//     }

//     xhr.onerror = (evt) => rej(evt);

//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable){
//         const percentage = (event.loaded/event.total)*100;
//         setProgress(Math.round(percentage));
//       }
//     }

//     const formData = new FormData();
//     formData.append('image', file);
//     xhr.send(formData);
//   })
// }

// export default SingleFile;