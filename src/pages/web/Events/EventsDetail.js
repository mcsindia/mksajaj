import React from "react";
import { useParams } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { WebHeader } from "../../../components/web/Header/WebHeader";
import { Footer } from "../../../components/web/Footer/Footer";
import { eventsData } from "./EventsCard";

export const EventsDetail = () => {
  const { id } = useParams();
  const event = eventsData.find((event) => event.id === parseInt(id));

  if (!event) {
    return <h2 className="text-center my-5">Event Not Found</h2>;
  }

  return (
    <>
      <WebHeader />
      <Container className="event-detail my-5">
        <h2 className="events-detail-title">{event.title}</h2>
        <p className="events-meta">{event.date} | {event.location}</p>
        <Image src={event.image} fluid className="events-detail-image mb-4" />
        <p className="events-detail-content">{event.description}</p>
      </Container>
      <Footer />
    </>
  );
};