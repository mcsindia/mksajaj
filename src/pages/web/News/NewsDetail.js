import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { newsData } from "./NewsCard"; // Import news data
import { Footer } from "../../../components/web/Footer/Footer";
import { WebHeader } from "../../../components/web/Header/WebHeader";

export const NewsDetail = () => {
  const { id } = useParams();
  const news = newsData.find((item) => item.id === parseInt(id));

  if (!news) {
    return <Container className="mt-5 text-center"><h2>News Not Found</h2></Container>;
  }

  return (
    <>
    <WebHeader/>
    <Container className="news-detail my-5">
      <h1 className="news-detail-title">{news.headline}</h1>
      <p className="news-meta">{news.date} | {news.category}</p>
      <img src={news.image} alt={news.headline} className="news-detail-image my-4" />
      <p className="news-detail-content">{news.description}</p>
    </Container>
    <Footer/>
    </>
  );
};
