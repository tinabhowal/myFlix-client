import React from 'react'
import { Form,Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export const UserUpdate = ({user, token}) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    if(!token){
      return;
    }
    

    fetch(`http://3.120.149.229/users/${user.Username}`,
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
        setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
    
          const data = {
            Username: username,
            Password: password,
            Email:email,
            Birthday:birthday
          };
          fetch(`http://3.120.149.229/users/${user.Username}`, {
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
               fetch(`http://3.120.149.229/users/${user.Username}`,{
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
            
            fetch(`http://3.120.149.229/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                alert(`${user.Username} deregistered`);
                onLoggedOut();
                navigate("/signup");
                window.location.reload();
                
            } else {
                alert("Something went wrong. Please try again.")
            }
        }).catch(err => console.log(err));
    }
    };

        

  return (
    <div>
        <Button onClick={handleUpdateClick} style={{ margin: '10px'}}>Edit Details</Button>
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

                    <Button variant={isHovering? "light" : "primary"} type="submit" style={{ margin: '10px'}}>Update</Button>
                    <Button 
                    variant="light"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    style={{ margin: '10px'}}
                    onClick={handleCancelForm} 
                  
                    >Cancel</Button>
                </Form>
                
        )}
          <Button variant="danger" onClick={handleDeleteUser} style={{ margin: ' 20px'}}>Delete Account</Button>
    </div>
  )
}

