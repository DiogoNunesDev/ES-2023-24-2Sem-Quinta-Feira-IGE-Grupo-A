import React, { useState } from 'react';
import '../styles/Upload.css'; // Import your CSS file for styling

const FileUploader = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleLocalFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoteFileUpload = () => {
    // Handle remote file upload
    console.log('Remote file upload URL:', fileUrl);
    // You can perform file fetching and upload logic here
  };

  const handleClose = () => {
    setOpen(false);
    // Clear any selected file and file URL when closing the dialog
    setFile(null);
    setFileUrl('');
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className='sidebar-button'>Upload Horario</button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2 style={{color:'black'}}>Upload File</h2>
            <div className="upload-section">
              <label>Choose the file you want to upload:</label>
              <br />
              <input type="file" onChange={handleLocalFileUpload} />
            </div>
            <div className="upload-section">
              <label>Paste the URL of the file to upload:</label>
              <br />
              <input 
                style={{backgroundColor:'black'}}
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button onClick={handleClose} className='pop-up-button'>Cancel</button>
              <button onClick={handleRemoteFileUpload} disabled={!fileUrl}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
