import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import hero_img from '../../../assets/images/hero-img4.png';

export const HomeHero = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          {/* Image first on small screens, text first on larger screens */}
          <Col xs={12} md={6} className="text-center order-md-2">
            <img 
              src={hero_img}
              alt="Community Gathering" 
              className="hero-image img-fluid rounded"
            />
          </Col>
          <Col xs={12} md={6} className="text-md-start order-md-1">
            <h1 className="hero-title">Welcome to Our Samaj</h1>
            <p className="hero-subtitle">
              Uniting communities, preserving traditions, and fostering growth for a better future.
            </p>
            <Button className="hero-button-active me-2">Join Us</Button>
            <Button className="hero-button">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
