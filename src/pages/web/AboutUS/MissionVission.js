import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import vision_img from "../../../assets/images/vission-img.jpg"
import mission_img from '../../../assets/images/mission-img.jpg'

export const MissionVision = () => {
  return (
    <div className="mission-vision-page">
    
      {/* Mission Section */}
      <Container className="mt-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src= {mission_img}
              alt="Mission"
              className="mission-vision-image"
            />
          </Col>
          <Col md={6}>
            <h2 className="mission-vission-title ">Our Mission</h2>
            <p className="mission-vision-text">
              The Samaj is dedicated to fostering unity, education, and economic
              growth within our community. We actively support social welfare
              initiatives, educational programs, and empowerment opportunities
              to uplift every member.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Vision Section */}
      <Container className="mt-5 mb-5">
        <Row className="align-items-center flex-md-row-reverse">
          <Col md={6}>
            <img
              src={vision_img}
              alt="Vision"
              className="mission-vision-image"
            />
          </Col>
          <Col md={6}>
            <h2 className="mission-vission-title ">Our Vision</h2>
            <p className="mission-vision-text">
              We envision a future where every member of our Samaj thrives with
              equal opportunities, cultural pride, and economic stability. By
              embracing progress while preserving our heritage, we aim to build
              a stronger, self-sufficient community for generations to come.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
