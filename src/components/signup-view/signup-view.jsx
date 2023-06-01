import React from "react";
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./signup-view.scss" ;
import { useEffect } from "react";
//import backgroundImage from "../../asset/background.svg";

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

  // Add the 'signup-view' class to the body element when the component mounts
  useEffect(() => {
    document.body.classList.add("signup-view");
    // Remove the 'signup-view' class when the component unmounts
    return () => {
      document.body.classList.remove("signup-view");
    };
  }, []);


    return(
      <div className="signup-view"
   style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
    gap: '40px',
  
  //     // backgroundImage: 'url("../../asset/background.svg")',
  //     backgroundImage: `url(${backgroundImage})`,
  
  //     backgroundSize: 'cover',
  //     height: '100vh',
      
      // display: flex;
      // justify-content: center;
      // align-items: center;
      
      /* Add any other styles you want */
    
  }}
   >
      <Form 
      onSubmit={handleSubmit}
      style={{display:"flex", justifyContent:"center", flexDirection: 'column', alignItems:"center"}}>
        <Form.Group controlId="formUsername">
          <Form.Label></Form.Label>
          <Form.Control
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e)=>{
            setUsername(e.target.value);
            validateUsername();
            }}
            style={{
              background: 'linear-gradient(181.88deg, rgba(217, 217, 217, 0.2) 1.91%, rgba(217, 217, 217, 0) 98.41%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              margin: '10px',
              boxSizing: 'border-box',
              width: '350px',
              height: '50px',
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: '20px'
            }}
            />
            {usernameError && <p style={{color:"red"}}>{usernameError}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label></Form.Label>
          <Form.Control
           placeholder="Password"
           type="password"
           value={password}
           onChange={(e) => {
            setPassword(e.target.value);
            validatePassword();
           }}
           style={{
            background: 'linear-gradient(181.88deg, rgba(217, 217, 217, 0.2) 1.91%, rgba(217, 217, 217, 0) 98.41%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            margin: '10px',
            boxSizing: 'border-box',
            width: '350px',
            height: '50px',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '20px'
          }}
           />
           {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label></Form.Label>
          <Form.Control
           placeholder="Email"
           type="email"
           value={email}
           onChange={(e) => {
            setEmail(e.target.value);
            validateEmail();
           }}
           style={{
            background: 'linear-gradient(181.88deg, rgba(217, 217, 217, 0.2) 1.91%, rgba(217, 217, 217, 0) 98.41%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            margin: '10px',
            boxSizing: 'border-box',
            width: '350px',
            height: '50px',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '20px'
          }}
           />
           {emailError && <p style={{color:"red"}}>{emailError}</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label></Form.Label>
          <Form.Control
          placeholder="Birthday"
           type="date"
           value={birthday}
           onChange={(e) => {
            setBirthday(e.target.value);
           }}
           style={{
            background: 'linear-gradient(181.88deg, rgba(217, 217, 217, 0.2) 1.91%, rgba(217, 217, 217, 0) 98.41%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            margin: '10px',
            boxSizing: 'border-box',
            width: '350px',
            height: '50px',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '20px'
          }}
           />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop:"0.5rem"}}>Submit</Button>
      </Form>
      </div>
    )
  };
