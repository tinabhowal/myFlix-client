import token from "../../redux/reducers/token";
import user from "../../redux/reducers/user";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UserUpdate } from "./user-update";
import { useSelector } from "react-redux";
import AddMovies from "../addMovie/AddMovies";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./profile-view.scss";
import { useState } from "react";

export const ProfileView = () => {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.token.token);
    const[showAddMovie, setShowAddMovie] = useState(false);

    const toggleAddMovie = () => {
        setShowAddMovie(!showAddMovie);
    }

    const formattedBirthday = new Date(user.Birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    
      
    
return(
    
      <Container className="top-margin">
        <Row className="justify-content-md-center shadow-effect p-4 mb-4 bg-white" >
            <Col md="auto"  className="border-0">
        <Card className="border-0">
            <Card.Body>
                <Card.Title className="mb-5" style={{textAlign:'center'}}>Profile Information</Card.Title>
                <Card.Text style={{textAlign:'center'}}>
                   
                    <UserInfo 
                    name= <strong>{user.Username} </strong>
                    email= <strong>{user.Email}</strong>
                    birthday= <strong>{formattedBirthday}</strong>
                    />
                </Card.Text>
                </Card.Body>
                <Card.Body>
                <UserUpdate/>
                </Card.Body>
                </Card>
                </Col>
                </Row>
                
                <Row className="justify-content-md-center shadow-effect p-4 mb-4 bg-white" >
                <Col md="auto"  className="border-0" >
                <Card className="border-0">
                    <Card.Body>
                    <FavoriteMovies/> 
                    </Card.Body>
                </Card>
                </Col>   
                </Row>

                <Row className="justify-content-md-center shadow-effect p-4 mb-4 bg-white" >
                {/* <Col md="auto"  className="border-0" > */}
                <Card className="border-0">
                    <Card.Title>Want to add a new movie?</Card.Title>
                    {showAddMovie && (
                        <Card.Body>
                        <AddMovies/> 
                        </Card.Body>
                    )}
                    <Card.Link onClick={toggleAddMovie} style={{cursor:'pointer'}}>{showAddMovie? 'Hide the form' : 'Click here'}</Card.Link>
                </Card>
                {/* </Col> */}
                </Row>     
   </Container>

)
    

};