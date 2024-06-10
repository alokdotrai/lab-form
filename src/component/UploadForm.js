// src/DocumentUploadForm.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const DocumentUploadForm = () => {
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentLocation, setDocumentLocation] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!documentName) newErrors.documentName = "Document Name is required";
    if (!documentType) newErrors.documentType = "Document Type is required";
    if (!documentLocation)
      newErrors.documentLocation = "Document Location is required";
    if (!file) newErrors.file = "File Attachment is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("Handle Submit");
    e.preventDefault();
    if (validateForm()) {
      const documentDetails = {
        documentName,
        documentType,
        documentLocation,
        file,
      };

      // Create Form Data Onject
      const form = new FormData();
      form.append("file", file);
      form.append("name", documentName);
      form.append("type", documentType);

      // Send Form Data To API Service
      const res = fetch("http://localhost:8000/documents/upload", {
        method: "POST",
        body: form,
      }).then((res) => res.json());
      alert(JSON.stringify(`${res.message}, status: ${res.status}`));
      clearForm();
    }
  };

  const clearForm = () => {
    setDocumentName("");
    setDocumentType("");
    setDocumentLocation("");
    setFile(null);
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <h4>Documents Manager</h4>
      </div>
      <div>
        <label>Document Name:</label>
        <input
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        {errors.documentName && (
          <span className="error">{errors.documentName}</span>
        )}
      </div>
      <div>
        <label>Document Type:</label>
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="">Select a type</option>
          <option value="Training">Training</option>
          <option value="Certificate">Certificate</option>
          <option value="Manual">Manual</option>
          <option value="License">License</option>
        </select>
        {errors.documentType && (
          <span className="error">{errors.documentType}</span>
        )}
      </div>
      <div>
        <label>Document Location:</label>
        <input
          type="text"
          value={documentLocation}
          onChange={(e) => setDocumentLocation(e.target.value)}
        />
        {errors.documentLocation && (
          <span className="error">{errors.documentLocation}</span>
        )}
      </div>
      <div>
        <label>File Attachment:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        {errors.file && <span className="error">{errors.file}</span>}
      </div>
      <button type="submit">Upload Document</button>
    </Form>
  );
};

export default DocumentUploadForm;
