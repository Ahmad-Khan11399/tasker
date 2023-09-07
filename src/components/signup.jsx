import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../style/App.css";
import Login from "./login";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        localStorage.setItem("email", data.user.email);
        setValue(true);
        console.log("successful ");
      })
      .catch((error) => {
        console.error("Error signing up:", error, error.code);
      });
  };

  return (
    <div className="main container ">
      {value ? (
        <Login />
      ) : (
        <div className="row justify-content-center">
          <div className="form ">
            <h1 className="big-heading">Sign Up</h1>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn custom-button btn-primary btn-block"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-3">
              <h2 className="big-heading">Already a User?</h2>
              <button
                href="/login"
                onClick={() => {
                  setValue(true);
                }}
                className="btn custom-button btn-primary btn-block"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
