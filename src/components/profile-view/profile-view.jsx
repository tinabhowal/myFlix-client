import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";




import { MovieCard } from "../movie-card/movie-card";
import { Card, Form, Button } from "react-bootstrap";

import "./profile-view.scss";

export const ProfileView = ({ user, favoriteMovies, token, toggleFavorite}) => {

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

    fetch(`https://myflix-gqp8.onrender.com/users`,
    {
        method: "GET",
        headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        if(data.user){
          console.log(data.user);
        }else{
          alert("User not found.");
        }
      }).catch((error) => {
        console.log(error);
      });
  },[username, token]);

    const handleToggle = (movie) => {
        toggleFavorite(movie);
    };

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
          fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
          }).then((response) => response.json())
            .then((data) => { console.log(data);
             if (data.ok) {
              alert("Update successful");
              setUpdateUser(true);
              window.location.reload();
              localStorage.setItem("user", JSON.stringify(data.user));
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
               fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}`,{
                     method: "GET",
                     headers:{
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                     },
               })
               .then((response) => response.json())
               .then((data) => {
                  if(data){
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
            fetch(`https://myflix-gqp8.onrender.com/users/${user.username}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.user){
                    alert("Account deleted successfully.");
                    navigate("/signup");

                }else{
                    alert("Account deletion failed. Please try again.");
                }
            })
            .catch((e) => {
                alert("Something went wrong. Please try again.")
                console.log(e);
            });
        }
    };

    
return(
    
      <div>
        <Card>
            <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text>
                    <strong>Username{user.Username}</strong> 
                </Card.Text>
                <Card.Text>
                    <strong>Email{user.Email} </strong> 
                </Card.Text>
                <Card.Text>
                    <strong>Birthday{user.Birthday} </strong> 
                </Card.Text>
                <div className="movie-list">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavorite={handleToggle}
                            hasFavorite={true}
                            
                        />    

                    ))}
                </div>
            </Card.Body>
        </Card>

    <Card>
        <Card.Body>
            <Button onClick={handleUpdateClick}>Update Details</Button>
                {showUpdateForm && (
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={handleUsernameChange} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>

                    <Form.Group controlId="FormEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={handleEmailChange} />
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={handleBirthdayChange} />
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
  
