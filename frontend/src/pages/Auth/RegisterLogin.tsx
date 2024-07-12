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
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });


    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateUsername = (username: string) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    };

    const handleRegister = async () => {
        let valid = true;
        const newErrors = { username: "", password: "", email: "", name: "" };

        if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (!validateUsername(username)) {
            newErrors.username = "Username cannot contain special characters";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                await dispatch(
                    authApi.register({ name, email, username, password })
                ).unwrap();
                navigate("/dashboard");
            } catch (error: any) {
                const errorMessage = error.message.split(':')[0].trim() || "An error occurred";
                if (error.message.includes("Username already exists")) {
                    setErrors((prev) => ({ ...prev, username: errorMessage }));
                } else if (error.message.includes("Email already registered")) {
                    setErrors((prev) => ({ ...prev, email: errorMessage }));
                } else {
                    setErrors((prev) => ({ ...prev, password: errorMessage }));
                }
            }
        }
    };

    const handleLogin = async () => {
        try {
            await dispatch(
                authApi.login({ username: username, password: password })
            ).unwrap();
            navigate("/dashboard");
        } catch (error: any) {
            const errorMessage = error.message.split(':')[0].trim() || "An error occurred";
            console.error("Failed to login:", error);
            setErrors({ username: "", password: errorMessage, email: "", name: "" });
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
                                {errors.email && <p className={s.errorMessage}>{errors.email}</p>}
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
                        {errors.username && <p className={s.errorMessage}>{errors.username}</p>}

                    </div>
                    <div className={s.formGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className={s.errorMessage}>{errors.password}</p>}
                    </div>
                    {/* the logic and setup to enable component switching based on login or register endpoint was written
        with some use ChatGPT, 2024*/}
                    <div className={s.submit}>
                        <button onClick={isRegister ? handleRegister : handleLogin}>
                            {isRegister ? "Create Account" : "Login"}
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
