import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

import DocumentUploadForm from "./component/UploadForm";
import Documents from "./component/DocumentList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Container fluid>
      <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <h1 style={{ color: "Red"}}>Concrete Labs</h1>
            </Navbar.Brand>
            <Nav className="ml-auto">
              {/* This piece is for the uploaded documents which was earlier created as the file details was showing on the main page/front end */}
              <Nav.Link as={Link} to="/" exact>
                Documents
              </Nav.Link>
              <Nav.Link as={Link} to="/upload">
                Upload File
              </Nav.Link>
            </Nav>
          </Navbar>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Documents />} />
              <Route path="/upload" element={<DocumentUploadForm />} />
            </Route>
          </Routes>
      </Router>
    </Container>
  );
};

export default App;
