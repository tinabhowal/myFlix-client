import React from "react";
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [birthday, setBirthday] = useState("");
    const navigate = useNavigate();
    
     // Verify that the username is of minimum length
  const usernamePattern = /^[a-zA-Z0-9]{5,}$/
  const validateUsername = () => {
    if (!username.match(usernamePattern)) {
      setUsernameError("Username should be alphanumeric and at least 5 characters long.");
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

  // Verify that the password follows the pattern
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validateEmail = () => {
   
    if(!email.match(emailPattern)){
      setEmailError("Email address is not valid.");
    }else{
      setEmailError("");
    }
    
  };

    
  
    const handleSubmit = (event) => {
        event.preventDefault();
        validateUsername();
        validatePassword();
        validateEmail();
        
    
        if (!passwordError && !usernameError && email && birthday) {
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };
      
      fetch('https://myflix-gqp8.onrender.com/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
        // window.location.reload();
       
      } else if (response.status === 422) {
        return response.json().then((data) => {
          let errorMessages = data.errors.map((error) => error.msg);
          alert(errorMessages.join("\n"));
        });
      } else {
        alert("Signup failed");
      }
    }).catch((e)=>{
        console.log(e);
    });
  }
  };

    return(
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
          type="text"
          value={username}
          onChange={(e)=>{
            setUsername(e.target.value);
            validateUsername();
            }}
            />
            {usernameError && <p style={{color:"red"}}>{usernameError}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
           type="password"
           value={password}
           onChange={(e) => {
            setPassword(e.target.value);
            validatePassword();
           }}
           />
           {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
           type="email"
           value={email}
           onChange={(e) => {
            setEmail(e.target.value);
            validateEmail();
           }}
           />
           {emailError && <p style={{color:"red"}}>{emailError}</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
           type="date"
           value={birthday}
           onChange={(e) => {
            setBirthday(e.target.value);
           }}
           />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    )
  };
