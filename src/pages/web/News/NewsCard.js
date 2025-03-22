import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import news_card from "../../../assets/images/news-card.jpg";

// News Data (Including Full Description)
export const newsData = [
  { id: 1, image: news_card, date: "March 20, 2025", category: "Education", headline: "New Education Policy Announced", description: "The government has introduced a new education policy aimed at improving the quality of education in schools and universities.", link: "/news/1" },
  { id: 2, image: news_card, date: "March 18, 2025", category: "Government", headline: "New Tax Reforms Introduced", description: "A series of tax reforms have been announced to simplify the tax filing process and reduce tax burdens on small businesses.", link: "/news/2" },
  { id: 3, image: news_card, date: "March 15, 2025", category: "Social", headline: "Community Clean-up Drive Success", description: "Thousands of volunteers participated in a city-wide clean-up drive, making a significant impact on local neighborhoods.", link: "/news/3" },
  { id: 4, image: news_card, date: "March 10, 2025", category: "Technology", headline: "AI Breakthrough in Healthcare", description: "Scientists have developed an AI model that can detect diseases with higher accuracy than traditional diagnostic methods.", link: "/news/4" },
  { id: 5, image: news_card, date: "March 5, 2025", category: "Sports", headline: "National Team Wins Championship", description: "The national team secured a thrilling victory in the championship finals, marking a historic achievement.", link: "/news/5" },
  { id: 6, image: news_card, date: "March 2, 2025", category: "Economy", headline: "Stock Market Hits Record High", description: "The stock market reached an all-time high today, driven by positive economic indicators and investor confidence.", link: "/news/6" },
  { id: 7, image: news_card, date: "February 25, 2025", category: "Entertainment", headline: "Award-Winning Movie Releases Soon", description: "A highly anticipated movie that won multiple international awards is set to release in theaters next week.", link: "/news/7" },
  { id: 8, image: news_card, date: "February 20, 2025", category: "Health", headline: "New Fitness Trends for 2025", description: "Experts reveal the latest fitness trends that will dominate in 2025, from wearable tech to mindful movement.", link: "/news/8" },
  { id: 9, image: news_card, date: "February 15, 2025", category: "Business", headline: "Startup Ecosystem Thrives", description: "The startup ecosystem is booming, with new ventures receiving significant funding and support from investors.", link: "/news/9" },  
];

export const NewsCard = ({ limit }) => {
  const navigate = useNavigate();

  // Show all news if limit is not provided
  const displayedNews = limit ? newsData.slice(0, limit) : newsData;

  return (
    <Container className="news-section my-5">
      <h2 className="section-title text-center mb-4">Latest News</h2>
      <Row className="g-4">
        {displayedNews.map((news) => (
          <Col key={news.id} xs={12} md={6} lg={4}>
            <Card className="news-card">
              <Card.Img variant="top" src={news.image} alt={news.headline} />
              <Card.Body>
                <Card.Title className="news-title">{news.headline}</Card.Title>
                <Card.Subtitle className="news-subtitle">{news.date} | {news.category}</Card.Subtitle>
                {/* Button to navigate to news details */}
                <Button className="hero-button-active" onClick={() => navigate(`/news/${news.id}`)}>
                  Read More →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
