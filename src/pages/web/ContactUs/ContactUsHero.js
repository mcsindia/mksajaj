import React from "react";
import { Container } from "react-bootstrap";

export const ContactUsHero = () => {
  return (
    <section className="contact-hero">
      <Container className="text-center">
        <h1 className="contact-title">We’d Love to Hear from You</h1>
        <p className="contact-subtitle">
          Whether you have questions, suggestions, or want to be part of our community, feel free to reach out!
        </p>
      </Container>
    </section>
  );
};
