import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage.jsx';
import InsertPossession from './components/InsertPossession.jsx';

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">Patrimoine</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Liste des possessions</Nav.Link>
          <Nav.Link as={Link} to="/create">Insert Possession</Nav.Link>
          
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<InsertPossession />} />
      </Routes>
    </Router>
  );
}

export default App;