import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import eventImage from "../../../assets/images/events-card.jpg"; 

// Dummy Event Data
export const eventsData = [
  {
    id: 1,
    image: eventImage,
    date: "April 10, 2025",
    location: "Mumbai, India",
    title: "Tech Conference 2025",
    description: "Join industry leaders to discuss the future of technology.",
    link: "/events/1",
  },
  {
    id: 2,
    image: eventImage,
    date: "May 15, 2025",
    location: "Delhi, India",
    title: "Startup Networking Meetup",
    description: "An exclusive meetup for entrepreneurs and investors.",
    link: "/events/2",
  },
  {
    id: 3,
    image: eventImage,
    date: "June 5, 2025",
    location: "Bangalore, India",
    title: "AI & Machine Learning Summit",
    description: "Explore the latest advancements in AI and ML technologies.",
    link: "/events/3",
  },
  {
    id: 4,
    image: eventImage,
    date: "July 20, 2025",
    location: "Chennai, India",
    title: "Cybersecurity Conference",
    description: "Learn about the latest trends in cybersecurity and data protection.",
    link: "/events/4",
  },
  {
    id: 5,
    image: eventImage,
    date: "August 12, 2025",
    location: "Hyderabad, India",
    title: "Blockchain Summit 2025",
    description: "Discover how blockchain is transforming industries.",
    link: "/events/5",
  },
  {
    id: 6,
    image: eventImage,
    date: "September 8, 2025",
    location: "Pune, India",
    title: "Green Energy Expo",
    description: "Explore sustainable energy solutions for the future.",
    link: "/events/6",
  },
];

export const EventsCard = () => {
  return (
    <Container className="events-section my-5">
      <h2 className="section-title text-center mb-4">Upcoming Events</h2>
      <Row className="g-4">
        {eventsData.map((event) => (
          <Col key={event.id} xs={12} md={6} lg={4}>
            <Card className="event-card">
              <Card.Img variant="top" src={event.image} alt={event.title} />
              <Card.Body>
                <Card.Title className="event-title">{event.title}</Card.Title>
                <Card.Subtitle className="event-subtitle">
                  {event.date} | {event.location}
                </Card.Subtitle>
                <Card.Text className="event-description">
                  {event.description}
                </Card.Text>
                <Button href={event.link} className="hero-button-active">
                  View Details →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
