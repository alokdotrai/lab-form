import React from "react";
import { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";


function Documents() {
    // Set default document list varibale
    const [documents, setDocuments] = useState([]);

    // Pull documents from the API
    useEffect(() => {
        fetch(' http://127.0.0.1:8000/documents')
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setDocuments(data);
        })

    }, []);

  return (
    <Table striped responsive bordered hover>
      <thead>
        <tr>
          <th colSpan={1}>#</th>
          <th colSpan={2}>Name</th>
          <th colSpan={2}>Type</th>
          <th colSpan={3}>Location</th>
          <th colSpan={2}>Created On</th>
          <th colSpan={2}>Updated On</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((value) => (
          <tr key={value.id}>
            <td colSpan={1}>{value.id}</td>
            <td colSpan={2}>{value.name}</td>
            <td colSpan={2}>{value.type}</td>
            <td colSpan={3}>{value.location}</td>
            <td colSpan={2}>{value.created}</td>
            <td colSpan={2}>{value.updated}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Documents;
