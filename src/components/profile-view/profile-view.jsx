import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";





// import { MovieCard } from "../movie-card/movie-card";
import { Card, Form, Button } from "react-bootstrap";

import "./profile-view.scss";

export const ProfileView = ({ user, token, favoriteMovies, toggleFavorite, storedUser, onLoggedOut}) => {

  const [updateUser, setUpdateUser] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
 
  


  useEffect(() => {
    if(!token){
      return;
    }
    

    fetch(`https://myflix-gqp8.onrender.com/users/${storedUser.Username}`,
    {
        method: "GET",
        headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        if(data){
          console.log("user-details:" ,data);
        }
      }).catch((error) => {
        console.log(error);
      });
  },[username, token]);

    // const handleToggle = (movie) => {
    //     toggleFavorite(movie);
    // };

    const handleUpdateClick = () => {
        setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
      };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handleBirthdayChange = (e) => {
        const newBirthday = e.target.value;
        setBirthday(newBirthday);
    }

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const handleCancelForm = (e) => {
        setUpdateUser(false);
        setUsername("");
        setEmail("");
        setBirthday("");
    }

    const handleUpdate = (e) => {
        e.preventDefault();
    
          const data = {
            Username: username,
            Password: password,
            Email:email,
            Birthday:birthday
          };
          fetch(`https://myflix-gqp8.onrender.com/users/${storedUser.Username}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
          }).then((response) => response.json())
            .then((data) => { 
            console.log(data);
             if (data) {
              alert("Update successful");
              setUpdateUser(false);
              window.location.reload();
              localStorage.setItem("user", JSON.stringify(data));
             }else{
              alert("Update failed. Please try again.");
             }
            })
            .catch((e)=>{
              alert("Something went wrong");
              console.log(e);
            });
        }

  

        

        useEffect(() => {
            if(updateUser){
               fetch(`https://myflix-gqp8.onrender.com/users/${storedUser.Username}`,{
                     method: "GET",
                     headers:{
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                     },
               })
               .then((response) => response.json())
               .then((data) => {
                  if(data){
                    console.log("updated data", data);
                    setUsername(data.username);
                    setPassword(data.password);
                    setEmail(data.email);
                    setBirthday(data.birthday);
                    setUpdateUser(false);
                  }
               })
               .catch((e) => {
                alert('Something went wrong while fetching user data.');
                console.log(e);
               });
            }
        },[updateUser])

    const navigate = useNavigate();

    const handleDeleteUser = () => {
        const confirmDelete = window.confirm("Are you sure you sure you want to delete your account?");
        
        if(confirmDelete){
            
            fetch(`https://myflix-gqp8.onrender.com/users/${storedUser.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                alert(`${storedUser.Username} deregistered`);
                onLoggedOut();
                navigate("/signup");
                window.location.reload();
                
            } else {
                alert("Something went wrong. Please try again.")
            }
        }).catch(err => console.log(err));
    }
    };

    const formattedBirthday = new Date(storedUser.Birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    

    
return(
    
      <div>
        <Card>
            <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text>
                   
                    <UserInfo 
                    name= <strong>{storedUser.Username} </strong>
                    email= <strong>{storedUser.Email}</strong>
                    birthday= <strong>{formattedBirthday}</strong>
                    />
                </Card.Text>
                
                <FavoriteMovies 
                favoriteMovies={favoriteMovies}
                toggleFavorite={toggleFavorite}
                />
            </Card.Body>
        </Card>

    <Card>
        <Card.Body>
            <Button onClick={handleUpdateClick}>Update Details</Button>
                {showUpdateForm && (
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={handleUsernameChange} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={handlePasswordChange}  required />
                    </Form.Group>

                    <Form.Group controlId="FormEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={handleEmailChange}  required />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={handleBirthdayChange}  required />
                    </Form.Group>

                    <Button variant="primary" type="submit">Update</Button>
                    <Button variant="secondary" onClick={handleCancelForm}>Cancel</Button>
                </Form>
                
        )}
          <Button onClick={handleDeleteUser}>Delete Account</Button>
        </Card.Body>
    </Card>    
   </div>

)
    

};