// im puting both login and quth here cuz im lazy, you guys can seperate them when you do th frontend for this

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { authApi } from "../../api/authApi";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  const token = useAppSelector(state => state.auth.jwtToken);

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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}



