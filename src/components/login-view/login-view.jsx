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

   <div className="login-view"
   style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
    gap: '40px'
   }}>
    <Form 
    onSubmit={handleSubmit}
    style={{display:"flex", justifyContent:"center", flexDirection: 'column', alignItems:"center"}}>
      <Form controlId="formUsername">
        {/* <Form.Label>Username:</Form.Label> */}
        <Form.Label ></Form.Label>
        <Form.Control
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => {
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
        // style={{
        //   background: "radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)",
        //   filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))",
        //   backdropFilter: "blur(27.5px)",
        //   borderRadius: "10px"
        // }}
        
        
        />
        {usernameError && <p style={{color: "red", whiteSpace: "nowrap"}}>{usernameError}</p>}
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
          style={{
            background: 'linear-gradient(181.88deg, rgba(217, 217, 217, 0.2) 1.91%, rgba(217, 217, 217, 0) 98.41%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: 'inset -5px -5px 10px rgba(255, 255, 255, 0.1), inset 5px 5px 10px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
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
          {passwordError && <p style={{color: "red"}}>{passwordError}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginTop:"0.5rem"}}>LOGIN</Button>
    </Form>
    <p style={{color:"#FFFFFF", whiteSpace:"nowrap"}}>Don't have an account?
    <a href="/signup"><i>SIGN UP</i></a></p>
    </div>
  )

}