import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";
import "./RegisterLogin.css";
import mg2 from '../../assets/mg2.png';


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
          <h1>Learn with mangoose</h1>
          <p>Join our learning platform to access interactive lessons and customized for your needs and interests!</p>
          <div className="logo-container">
            <img src={mg2} alt="logo" className="logo" />
          </div>
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
        {/* the logic and setup to enable component switching based on login or register endpoint was written
        with some use ChatGPT, 2024*/}
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
