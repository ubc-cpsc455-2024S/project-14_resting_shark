import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";
import "./RegisterLogin.css";
import swanImage from "../../assets/swan.jpeg"; 

export default function RegisterLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      await dispatch(
        authApi.register({ username, password })
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await dispatch(
        authApi.login({ username: username, password: password })
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const isRegister = location.pathname === "/register";

  return (
    <div className="create-account-container">
      <div className="left-container">
        <div className="left-content">
          <h1>Learn with Study Swan</h1>
          <p>Join our learning platform to access interactive lessons and customized for your needs and interests!</p>
        </div>
      </div>
      <div className="right-container">
        <div className="right-content">
          <h1>{isRegister ? "Create an Account" : "Login"}</h1>
          {isRegister && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button onClick={isRegister ? handleRegister : handleLogin}>
              {isRegister ? "Register" : "Login"}
            </button>
          </div>
          <p className="login-prompt">
            {isRegister ? (
              <>
                Already have an account? <a href="/login">Log In</a>
              </>
            ) : (
              <>
                Don't have an account? <a href="/register">Register</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
