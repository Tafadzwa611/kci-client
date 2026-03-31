import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';

const LoanFiles = ({ loanId, files, setLoan }) => {
  const [progress, setProgress] = useState({});

  const onDrop = async (acceptedFiles) => {
    const progressMap = {};
    acceptedFiles.forEach((file) => {
      progressMap[file.path] = { progress: 0, status: 'In Progress' };
    });
    setProgress(progressMap);

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
        postXHR.open('POST', `/loansapi/add_loan_file/${loanId}/`);

        const formData = new FormData();
        formData.append('filename', fileName);
        formData.append('description', file.name);
        formData.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
        postXHR.send(formData);

        postXHR.onload = () => {
          const jsonResponse = JSON.parse(postXHR.responseText);
          setLoan((curr) => ({ ...curr, files: [...curr.files, jsonResponse] }));
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

      const blob = new Blob([file], { type: 'mimeType' });
      xhr.send(blob);
    });
  };

  const dowloadFile = async (evt) => {
    const response = await axios.get(
      `/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${evt.target.id}`
    );
    const signedUrl = response.data.url;
    const link = document.createElement('a');
    link.download = evt.target.attributes.name.value;
    link.href = signedUrl;
    document.body.appendChild(link);
    link.click();
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
      await axios.delete(`/loansapi/delete_loan_file/${evt.target.id}/`, CONFIG);
      setLoan((curr) => ({
        ...curr,
        files: curr.files.filter((file) => file.id != evt.target.id),
      }));
    } catch {
      console.log('error');
    }
  };

  return (
    <>
      <style>
        {`
          .sf-loan-files {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .sf-loan-files-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 0.25rem;
          }

          .sf-loan-file-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.875rem 1rem;
            border: 1px solid var(--sf-border, #d0d5dd);
            border-radius: 14px;
            background: var(--sf-surface, #ffffff);
            flex-wrap: wrap;
          }

          .sf-loan-file-meta {
            min-width: 0;
            flex: 1 1 320px;
            color: var(--sf-text, #111827);
            font-size: 0.95rem;
            line-height: 1.45;
            word-break: break-word;
          }

          .sf-loan-file-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .sf-loan-file-action {
            cursor: pointer;
          }

          .sf-dropzone-wrap {
            width: 100%;
          }

          .sf-dropzone {
            border: 1px dashed var(--sf-border, #d0d5dd);
            border-radius: 12px;
            background: var(--sf-surface, #fff);
            padding: 1rem 1.125rem;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          }

          .sf-dropzone:hover {
            border-color: var(--sf-primary, #635bff);
            box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.08);
          }

          .sf-dropzone-text {
            margin: 0;
            font-size: 0.95rem;
            color: var(--sf-muted, #667085);
          }

          .sf-upload-panel {
            margin-top: 1rem;
            border: 1px solid var(--sf-border, #d0d5dd);
            border-radius: 14px;
            background: var(--sf-surface, #ffffff);
            padding: 1rem;
          }

          .sf-upload-panel-title {
            margin: 0 0 0.875rem;
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--sf-text, #111827);
          }

          .sf-upload-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.875rem;
          }

          .sf-upload-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .sf-upload-item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .sf-upload-name {
            min-width: 0;
            flex: 1 1 220px;
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--sf-text, #111827);
            word-break: break-word;
          }

          .sf-upload-status {
            font-size: 0.875rem;
            font-weight: 700;
            color: var(--sf-text, #111827);
            white-space: nowrap;
          }

          .sf-upload-bar {
            width: 100%;
            height: 8px;
            border-radius: 999px;
            background: var(--sf-border, #e5e7eb);
            overflow: hidden;
          }

          .sf-upload-bar-fill {
            height: 100%;
            width: 0%;
            background: var(--sf-primary, #635bff);
            transition: width 0.2s ease;
          }

          body.dark .sf-loan-file-row,
          [data-theme='dark'] .sf-loan-file-row,
          html.dark .sf-loan-file-row {
            background: var(--sf-surface, #111827);
            border-color: var(--sf-border, #374151);
          }

          body.dark .sf-loan-file-meta,
          [data-theme='dark'] .sf-loan-file-meta,
          html.dark .sf-loan-file-meta {
            color: var(--sf-text, #f3f4f6);
          }

          body.dark .sf-dropzone,
          [data-theme='dark'] .sf-dropzone,
          html.dark .sf-dropzone {
            background: var(--sf-surface, #111827);
            border-color: var(--sf-border, #374151);
          }

          body.dark .sf-dropzone-text,
          [data-theme='dark'] .sf-dropzone-text,
          html.dark .sf-dropzone-text {
            color: var(--sf-muted, #9ca3af);
          }

          body.dark .sf-upload-panel,
          [data-theme='dark'] .sf-upload-panel,
          html.dark .sf-upload-panel {
            background: var(--sf-surface, #111827);
            border-color: var(--sf-border, #374151);
          }

          body.dark .sf-upload-panel-title,
          [data-theme='dark'] .sf-upload-panel-title,
          html.dark .sf-upload-panel-title,
          body.dark .sf-upload-name,
          [data-theme='dark'] .sf-upload-name,
          html.dark .sf-upload-name,
          body.dark .sf-upload-status,
          [data-theme='dark'] .sf-upload-status,
          html.dark .sf-upload-status {
            color: var(--sf-text, #f3f4f6);
          }

          body.dark .sf-upload-bar,
          [data-theme='dark'] .sf-upload-bar,
          html.dark .sf-upload-bar {
            background: #1f2937;
          }

          @media (max-width: 768px) {
            .sf-loan-file-row {
              padding: 0.875rem;
            }

            .sf-dropzone {
              min-height: 96px;
              padding: 0.875rem;
            }

            .sf-upload-panel {
              padding: 0.875rem;
            }

            .sf-upload-item-top {
              align-items: flex-start;
              flex-direction: column;
            }

            .sf-loan-file-actions {
              width: 100%;
            }
          }
        `}
      </style>

      <div className='sf-loan-files'>
        <div className='sf-loan-files-list'>
          {files.map((file) => (
            <div key={file.filename} className='sf-loan-file-row'>
              <div className='sf-loan-file-meta'>
                {file.description}-{file.user_name}-{file.date_added}
              </div>

              <div className='sf-loan-file-actions'>
                <span
                  style={{ cursor: 'pointer' }}
                  className='badge badge-info sf-loan-file-action'
                  id={file.filename}
                  name={file.description}
                  onClick={dowloadFile}
                >
                  Download
                </span>

                <span
                  style={{ cursor: 'pointer' }}
                  className='badge badge-danger sf-loan-file-action'
                  id={file.id}
                  onClick={deleteFile}
                >
                  Remove
                </span>
              </div>
            </div>
          ))}
        </div>

        <Dropzone onDrop={onDrop}>
          {({ acceptedFiles, getRootProps, getInputProps }) => (
            <section className='sf-dropzone-wrap'>
              <div {...getRootProps({ className: 'sf-dropzone' })}>
                <input {...getInputProps()} />
                <p className='sf-dropzone-text'>
                  Drag and drop some files here, or click to select files
                </p>
              </div>

              <aside className='sf-upload-panel'>
                <p className='sf-upload-panel-title'>Files</p>

                <ul className='sf-upload-list'>
                  {acceptedFiles.map((file) => (
                    <li key={file.path} className='sf-upload-item'>
                      <div className='sf-upload-item-top'>
                        <span className='sf-upload-name'>{file.path}</span>
                        <span className='sf-upload-status'>
                          {progress[file.path]?.status} {progress[file.path]?.progress}%
                        </span>
                      </div>

                      <div className='sf-upload-bar'>
                        <div
                          className='sf-upload-bar-fill'
                          style={{ width: `${progress[file.path]?.progress || 0}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default LoanFiles;