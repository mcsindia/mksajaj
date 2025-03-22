import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaRegCalendarAlt, FaGraduationCap, FaUsers, FaBookOpen, FaChild } from "react-icons/fa";

export const WhatWeDo = () => {
  const activities = [
    { icon: <FaRegCalendarAlt />, title: "Organizing Events & Festivals", description: "We celebrate cultural festivals and organize social gatherings to strengthen community bonds." },
    { icon: <FaGraduationCap />, title: "Educational Guidance & Scholarships", description: "Providing academic support and financial aid to deserving students for a brighter future." },
    { icon: <FaUsers />, title: "Community Support & Awareness", description: "Creating initiatives for social welfare, health awareness, and support programs for the needy." },
    { icon: <FaBookOpen />, title: "Member Directory", description: "Maintaining a comprehensive directory of members categorized by state and district for better connectivity." },
    { icon: <FaChild />, title: "Youth Engagement & Social Welfare", description: "Encouraging youth participation in leadership, skill development, and welfare programs to ensure growth." },
  ];

  return (
    <section className="what-we-do-section">
      <Container>
        <h2 className="text-center mb-4">Our Initiatives</h2>
        <Row className="d-flex flex-wrap justify-content-center g-4">
          {activities.map((activity, index) => (
            <Col md={4} sm={6} key={index}>
              <Card className="what-we-do-card">
                <div className="what-we-do-icon">{activity.icon}</div>
                <Card.Body>
                  <Card.Title>{activity.title}</Card.Title>
                  <Card.Text>{activity.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
