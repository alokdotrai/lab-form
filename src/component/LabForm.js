// src/DocumentManager.js
import React, { useState, useEffect } from "react";
import DocumentUploadForm from "./UploadForm";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Load documents from local storage on mount
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(storedDocuments);
  }, []);

  const handleDocumentUpload = (documentDetails) => {
    const updatedDocuments = [...documents, documentDetails];
    setDocuments(updatedDocuments);
    console.log(updatedDocuments)
  };

  return (
    <div>
      <h2>
        <b>Details Manager</b>
      </h2>
      <DocumentUploadForm onUpload={handleDocumentUpload} />
      {/* // This piece of code is to show the uploaded response on the front page and enables the user to download it's attached/uploaded document.
      {/* <h2>Uploaded Documents</h2> */}
      {/* <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            <strong>{doc.documentName}</strong> ({doc.documentType}) -{" "}
            {doc.documentLocation}
            <a href={URL.createObjectURL(doc.file)} download={doc.file.name}>
              Download
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default DocumentManager;
