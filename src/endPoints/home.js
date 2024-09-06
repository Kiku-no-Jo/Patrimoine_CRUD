import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container text-center">
      <h1 className="mb-4">--Bienvenue sur le projet Patrimoine--</h1>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Link to="/patrimoine" className="btn btn-danger btn-lg w-100">
              Accéder au Patrimoine
            </Link>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Link to="/possession" className="btn btn-success btn-lg w-100">
              Accéder aux Possessions
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
