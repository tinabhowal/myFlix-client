import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UserUpdate } from "./user-update";

// import { MovieCard } from "../movie-card/movie-card";
import { Card, Container, Row, Col } from "react-bootstrap";

import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  favoriteMovies,
  toggleFavorite,
  storedUser,
  onLoggedOut,
}) => {
  const formattedBirthday = new Date(user.Birthday).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Container>
      <Row className="justify-content-md-center shadow-effect p-4 mb-4 bg-white">
        <Col md="auto" className="border-0">
          <Card className="border-0">
            <Card.Body>
              <Card.Title className="mb-5">Profile Information</Card.Title>
              <Card.Text>
                <UserInfo
                  name=<strong>{user.Username} </strong>
                  email=<strong>{user.Email}</strong>
                  birthday=<strong>{formattedBirthday}</strong>
                />
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <UserUpdate user={user} token={token} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center shadow-effect p-4 mb-4 bg-white">
        <Col md="auto" className="border-0">
          <Card className="border-0">
            <Card.Body>
              <FavoriteMovies
                favoriteMovies={favoriteMovies}
                toggleFavorite={toggleFavorite}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
