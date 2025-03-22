import React from "react";
import { Carousel, Container } from "react-bootstrap";
import event_bg from "../../../assets/images/event-bg2.avif"

const eventData = [
    {
        image: event_bg,
        name: "Annual Samaj Meet – Feb 2025",
        date: "February 20, 2025",
        description: "A gathering of 500+ community members to celebrate culture and unity.",
        testimonial: "This event brought us all together like never before! – Ramesh Sharma",
        person: "Ramesh Sharma, Community Leader",
    },
    {
        image: event_bg,
        name: "Business Summit 2025",
        date: "March 15, 2025",
        description: "Top industry leaders shared insights on the future of business and technology.",
        testimonial: "An enlightening experience with great networking opportunities! – Priya Mehta",
        person: "Priya Mehta, Entrepreneur",
    },
    {
        image: event_bg,
        name: "Music Fest 2025",
        date: "April 10, 2025",
        description: "A night full of music, fun, and joy with top artists performing live.",
        testimonial: "An electrifying experience that I will never forget! – Raj Verma",
        person: "Raj Verma, Music Enthusiast",
    },
];

export const EventSlider = () => {
    return (
        <Container className="event-slider">
            <Carousel fade interval={3000} controls indicators>
                {eventData.map((event, index) => (
                    <Carousel.Item key={index}>
            
                        <img src={event.image} alt={event.name} className="event-image" />
                        <Carousel.Caption className="event-caption">
                            <h3>{event.name}</h3>
                            <p className="event-date">{event.date}</p>
                            <p>{event.description}</p>

                            <div className="testimonial-container">
                                <blockquote className="event-testimonial">“{event.testimonial}”</blockquote>
                                <p className="event-person">- {event.person}</p>
                            </div>
                        </Carousel.Caption>

                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

