import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";
import "./Register.css";
import swanImage from "../../assets/swan.jpeg"; 

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  // return (
  //   <div className="create-account-container">
  //     <div className="left-container">
  //       <div className="left-content">
  //         <h1>Learn with Study Swan</h1>
  //         <p>Join our learning platform to access interactive lessons that are customized for your needs and interests!</p>
  //         {/* <img src={swanImage} alt="Study Swan Logo" className="swan-logo" /> */}
  //       </div>
  //     </div>
  //     <div className="right-container">
  //       <div className="right-content">
  //         <h2>Create an Account</h2>
  //         <div>
  //           <label>
  //             Username:
  //             <input
  //               type="text"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Password:
  //             <input
  //               type="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <button onClick={handleRegister}>Register</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

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
          <h1>Create an Account</h1>
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
            />
          </div>
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
            <button onClick={handleRegister}>Register</button>
          </div>
          <div className="login-prompt-container">
            <p>Already have an account?</p>
            <a href="/login">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
