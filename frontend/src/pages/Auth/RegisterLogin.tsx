import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";
import s from "./RegisterLogin.module.css";
import mg2 from "../../assets/mg2.png";

export default function RegisterLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      await dispatch(
        authApi.register({ name, email, username, password })
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
    <div className={s.createAccountContainer}>
      <div className={s.leftContainer}>
        <div className={s.leftContent}>
          <h1>Learn with mangoose</h1>
          <p>
            Join our learning platform to access interactive lessons and
            customized for your needs and interests!
          </p>
          <div className={s.logoContainer}>
            <img src={mg2} alt="logo" className={s.logo} />
          </div>
        </div>
      </div>
      <div className={s.rightContainer}>
        <div className={s.form}>
          <h1>{isRegister ? "Create an Account" : "Login"}</h1>
          {isRegister && (
            <>
              <div className={s.formGroup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={s.formGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          )}
          <div className={s.formGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={s.formGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* the logic and setup to enable component switching based on login or register endpoint was written
        with some use ChatGPT, 2024*/}
          <div className={s.submit}>
            <button onClick={isRegister ? handleRegister : handleLogin}>
              {isRegister ? "Register" : "Login"}
            </button>
          </div>
          <div className={s.loginPrompt}>
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <a href="/login" className={s.space}>
                  Log In
                </a>
              </p>
            ) : (
              <>
                Don't have an account?{" "}
                <a href="/register" className={s.space}>
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
