import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";

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

  return (
    <div>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
