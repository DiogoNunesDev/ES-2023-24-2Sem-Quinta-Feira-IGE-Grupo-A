import React, { useContext, useState } from "react";
import "../styles/Upload.css"; // Import your CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalContext";

const FileUploader = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const { getHorario } = useContext(GlobalContext);

  const uploadFile = (file) => {
    getHorario(file);
  };

  const handleClose = () => {
    setOpen(false);
    setFile("");
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="uploadBtn">
        <FontAwesomeIcon icon={faPlus} />
        Upload Horario
      </div>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ color: "black" }}>Upload File</h2>
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "black",
                marginBottom: "20px",
              }}
            ></div>
            <div className="divider"></div>
            <div className="upload-section">
              <label>Escolhe o ficheiro que queres dar upload:</label>
              <br />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input-element"
              />
              <button onClick={()=>{uploadFile(file)}} className="pop-up-button">
                Upload Local
              </button>
            </div>
            <div className="upload-section">
              <label>Insere o url do horário:</label>
              <br />
              <input
                className="input-element"
                placeholder="https://..."
                type="text"
                onChange={(e) => setFileUrl(e.target.value)}
              />
              <button
                onClick={()=>{uploadFile(fileUrl)}}
                className="pop-up-button"
                disabled={!fileUrl}
              >
                Upload Remote
              </button>
            </div>
            <div className="buttons">
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "#F86060",
                  width: "100%",
                  border: "1px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploader;
