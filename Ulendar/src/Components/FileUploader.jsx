import React, { useState } from 'react';
import '../styles/Upload.css'; // Import your CSS file for styling


let globalCSVFile = null;

const FileUploader = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleLocalFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Optionally, you can also automatically close the modal and reset the URL field here
    // setOpen(false);
    // setFileUrl('');
  };

  const uploadLocalFile = () => {
    if (!file) {
      console.error('No file selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Replace this URL with the endpoint you wish to upload files to
    const uploadURL = '/upload/local';

    fetch(uploadURL, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful upload here
      handleClose(); // Close the modal after upload
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const uploadRemoteFile = () => {
    // Handle remote file upload
    console.log('Remote file upload URL:', fileUrl);

    // Replace this URL with the endpoint you wish to upload files to
    const uploadURL = '/upload/remote';

    fetch(uploadURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileUrl }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful upload here
      handleClose(); // Close the modal after upload
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleClose = () => {
    setOpen(false);
    // Clear any selected file and file URL when closing the dialog
    setFile(null);
    setFileUrl('');
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="sidebar-button">Upload Horario</button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{color:'black'}}>Upload File</h2>
            <div style={{height:'1px', width:'100%', backgroundColor:'black', marginBottom:'20px'}}></div>
            <div className="divider"></div>
            <div className="upload-section">
              <label>Escolhe o ficheiro que queres dar upload:</label>
              <br />
              <input type="file" onChange={handleLocalFileUpload} className='input-element'/>
              <button onClick={uploadLocalFile} className='pop-up-button'>
                Upload Local
              </button>
            </div>
            <div className="upload-section">
              <label>Insere o url do ficheiro para dar upload:</label>
              <br />
              <input 
                className='input-element'
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
              <button onClick={uploadRemoteFile } className='pop-up-button' disabled={!fileUrl}>
                Upload Remote
              </button>
            </div>
            <div className="buttons">
              <button onClick={handleClose} style={{backgroundColor:'red', width:'100%', border:'1px'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
