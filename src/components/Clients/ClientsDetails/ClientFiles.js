import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';

const Errors = {
  downError: 'downError',
  delError: 'delError',
};

function ClientFiles({ client, setClient }) {
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const progress = {};
    acceptedFiles.forEach((file) => {
      progress[file.path] = { progress: 0, status: 'In Progress' };
    });
    setProgress(progress);

    const urls = acceptedFiles.map((acceptedFile) => {
      const ext = acceptedFile.name.split('.').pop();
      return `/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files&ext=${ext}`;
    });

    const signedUrls = await axios.all(urls.map((url) => axios.get(url)));

    Promise.all(
      signedUrls.map((url, idx) => {
        return uploadFile(
          acceptedFiles[idx],
          url.data.url,
          url.data.filename,
          setProgress
        );
      })
    );
  };

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
          jsonResponse.name = jsonResponse.filename;

          setClient((curr) => ({
            ...curr,
            files: [...curr.files, jsonResponse],
          }));

          setProgress((curr) => ({
            ...curr,
            [file.path]: { ...curr[file.path], status: 'Uploaded' },
          }));

          res();
        };

        postXHR.onerror = (evt) => {
          setProgress((curr) => ({
            ...curr,
            [file.path]: { ...curr[file.path], status: 'Failed' },
          }));
          rej(evt);
        };
      };

      xhr.onerror = (evt) => {
        setProgress((curr) => ({
          ...curr,
          [file.path]: { ...curr[file.path], status: 'Failed' },
        }));
        rej(evt);
      };

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          setProgress((curr) => ({
            ...curr,
            [file.path]: {
              ...curr[file.path],
              progress: Math.round(percentage),
            },
          }));
        }
      };

      const blob = new Blob([file], {
        type: file.type || 'application/octet-stream',
      });

      xhr.send(blob);
    });
  };

  const dowloadFile = async (evt) => {
    setError(null);

    const filename = evt.target.id;

    try {
      const response = await axios.get(
        `/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${filename}`
      );

      const signedUrl = response.data.url;

      axios({
        url: signedUrl,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);

          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
          setError(Errors.downError);
        });
    } catch (error) {
      console.log(error);
      setError(Errors.downError);
    }
  };

  const deleteFile = async (evt) => {
    const CONFIG = {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.delete(`/clientsapi/delete_file/${evt.target.id}/`, CONFIG);

      setClient((curr) => ({
        ...curr,
        files: curr.files.filter((file) => file.id != evt.target.id),
      }));
    } catch (error) {
      console.log(error);
      setError(Errors.delError);
    }
  };

  return (
    <>
      <style>
        {`
        .sf-client-files {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sf-client-file-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border: 1px solid var(--sf-border);
          border-radius: 14px;
          background: var(--sf-surface);
          flex-wrap: wrap;
        }

        .sf-client-file-meta {
          flex: 1;
          font-size: 0.95rem;
          color: var(--sf-text);
        }

        .sf-client-file-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sf-inline-error {
          color: var(--danger);
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* DROPZONE */
        .sf-dropzone {
          border: 1px dashed var(--sf-border);
          border-radius: 12px;
          background: var(--sf-surface);
          padding: 1rem;
          min-height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sf-dropzone:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99,91,255,0.08);
        }

        .sf-dropzone-text {
          color: var(--sf-muted);
          font-size: 0.95rem;
        }

        /* UPLOAD PANEL */
        .sf-upload-panel {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 14px;
          border: 1px solid var(--sf-border);
          background: var(--sf-surface);
        }

        .sf-upload-item {
          margin-bottom: 0.75rem;
        }

        .sf-upload-name {
          font-weight: 600;
          color: var(--sf-text);
        }

        .sf-upload-status {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .sf-upload-bar {
          height: 8px;
          border-radius: 999px;
          background: var(--sf-border);
          overflow: hidden;
          margin-top: 4px;
        }

        .sf-upload-bar-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.2s ease;
        }

        /* DARK MODE */
        body.dark .sf-dropzone {
          background: rgba(255,255,255,0.06);
        }

        body.dark .sf-upload-panel {
          background: rgba(255,255,255,0.04);
        }
        `}
      </style>

      <div className='sf-client-files'>
        {client.files.map((file) => (
          <div key={file.id} className='sf-client-file-row'>
            <div className='sf-client-file-meta'>
              {file.description}-{file.user_name}-{file.date_added}
            </div>

            <div className='sf-client-file-actions'>
              <span
                className='badge badge-info'
                id={file.name}
                onClick={dowloadFile}
              >
                Download
              </span>

              {error === Errors.downError && (
                <span className='sf-inline-error'>Error downloading</span>
              )}

              <span
                className='badge badge-danger'
                id={file.id}
                onClick={deleteFile}
              >
                Remove
              </span>

              {error === Errors.delError && (
                <span className='sf-inline-error'>Error deleting</span>
              )}
            </div>
          </div>
        ))}

        <Dropzone onDrop={onDrop}>
          {({ acceptedFiles, getRootProps, getInputProps }) => (
            <>
              <div {...getRootProps({ className: 'sf-dropzone' })}>
                <input {...getInputProps()} />
                <p className='sf-dropzone-text'>
                  Drag and drop files here, or click to select
                </p>
              </div>

              <div className='sf-upload-panel'>
                {acceptedFiles.map((file) => (
                  <div key={file.path} className='sf-upload-item'>
                    <div className='sf-upload-name'>{file.path}</div>
                    <div className='sf-upload-status'>
                      {progress[file.path]?.status} {progress[file.path]?.progress}%
                    </div>

                    <div className='sf-upload-bar'>
                      <div
                        className='sf-upload-bar-fill'
                        style={{
                          width: `${progress[file.path]?.progress || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Dropzone>
      </div>
    </>
  );
}

export default ClientFiles;