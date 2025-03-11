import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Raw Response:", response);
  
      if (!response.ok) {
        console.error("Server Error:", response.status, response.statusText);
        alert("Login failed! Please check your credentials.");
        return;
      }
  
      const dataObj = await response.json();
      console.log("API Response:", dataObj); // Debugging log
  
      if (dataObj.success) {
        console.log("Received Token:", dataObj.token); // Confirm token exists
        localStorage.setItem("auth-token", dataObj.token);
        window.location.replace("/");
      } else {
        alert(dataObj.errors || "Invalid login details.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong! Check your server.");
    }
  };
  
  

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        console.log("Stored Token:", localStorage.getItem("auth-token"));
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
