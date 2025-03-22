import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const NewsHero = () => {
  return (
    <div className="news-hero">
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="news-hero-title">Latest News & Updates</h1>
            <p className="news-hero-subtitle">
              Stay informed with the latest happenings and important updates.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
