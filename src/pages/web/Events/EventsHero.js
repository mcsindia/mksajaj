import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const EventsHero = () => {
  return (
    <div className="events-hero">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="hero-title"> Events</h1>
            <p className="hero-subtitle">
              Stay updated with the latest events happening in our community.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
