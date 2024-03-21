

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import "./navigation-bar.scss";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user.user);
  
  const dispatch = useDispatch();

  const onLoggedOut = async() => {
     dispatch(setUser(null));
     dispatch(setToken(null));
    localStorage.clear();
  };


  return (
    <Navbar bg="light" expand="lg" fixed="top" className="navbar-shadow">
      <Container >
        <Navbar.Brand as={Link} to="/" className="brand-text">
          MyFix 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-links">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/"  className="nav-link-right">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile"  className="nav-link-right">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}  className="nav-link-right">Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};






