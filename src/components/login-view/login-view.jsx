import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";


import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";

export const LoginView = ({onLoggedIn}) => {

  const [username, setUsername] = useState("");   
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  

  // Verify that the username is of minimum length
  const usernamePattern = /^.{3,}$/;
  const validateUsername = () => {
    if (!username.match(usernamePattern)) {
      setUsernameError("Username should be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  // Verify that the password follows the pattern
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  const validatePassword = () => {
    if (!password.match(passwordPattern)) {
      setPasswordError("Password should be atleast 8 characters long, contain a digit and a letter.");
    } else {
      setPasswordError("");
    }
  };


  // Handle submission of the login form
  
  const handleSubmit = (e) => {
    e.preventDefault();
    validatePassword();
    validateUsername();
    let data;
    if (!passwordError && !usernameError) {
      data = {
        Username: username,
        Password: password
      };
      fetch("https://myflix-gqp8.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((data) => { console.log("Login response:", data);
         if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          // onLoggedIn(data.user, data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
         }else{
          alert("No such user");
         }
        })
        .catch((e)=>{
          alert("Something went wrong");
          console.log(e);
        });
    }
  };
  

  // Add the 'login-view' class to the body element when the component mounts
  useEffect(() => {
    document.body.classList.add("login-view");
    // Remove the 'login-view' class when the component unmounts
    return () => {
      document.body.classList.remove("login-view");
    };
  }, []);

  return (

   <div className="login-view">
    <Form 
    onSubmit={handleSubmit}>
      <Form controlId="formUsername">
        {/* <Form.Label>Username:</Form.Label> */}
        <Form.Label></Form.Label>
        <Form.Control
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => {
        setUsername(e.target.value);
        validateUsername();
        }}
        className="my-custom-class"
        />
        {usernameError && <p style={{color: "red"}}>{usernameError}</p>}
      </Form>

    

      <Form.Group controlId="formPassword">
        {/* <Form.Label>Password:</Form.Label> */}
        <Form.Control
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
          setPassword(e.target.value);
          validatePassword();
          }}
          className="my-custom-class"
          />
          {passwordError && <p style={{color: "red"}}>{passwordError}</p>}
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </div>
  )

}