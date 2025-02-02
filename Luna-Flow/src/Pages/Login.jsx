import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../firebase/auth";
import { useAuth } from "../Contexts/authContext";

function Login() {

    const { userLoggedIn, loading, currentUser } = useAuth();

    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isMakeNewAccount, setIsMakeNewAccount] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        console.log("Logging in with:", loginData);
        setErrorMessage("");

        if (!isSigningIn) {
        setIsSigningIn(true);
        try {
            const curUser = await doSignInWithEmailAndPassword(
            loginData.email, // Changed from `username` to `email`
            loginData.password
            );
            console.log("User ID:", curUser.user.uid);
        } catch (error) {
            console.error("Login Error:", error.message);
            setErrorMessage(error.message);
        } finally {
            setIsSigningIn(false);
        }
        }
    };

    const handleRegister = async () => {
        console.log("Registering with:", registerData);
        setErrorMessage("");

        if (!isSigningIn && !isRegistering) {
        setIsRegistering(true);
        try {
            const newUser = await doCreateUserWithEmailAndPassword(
            registerData.email,
            registerData.password
            );
            console.log("Registered User:", newUser.user);
        } catch (error) {
            console.error("Registration Error:", error.message);
            setErrorMessage(error.message);
        } finally {
            setIsRegistering(false);
        }
        }
    };

    return (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#ffffff",
            color: "#000",
            fontFamily: "Arial, sans-serif",
        }}
        >
        <h1 style={{ marginBottom: "20px", fontSize: "36px", fontWeight: "bold" }}>
            Welcome to Luna Flow
        </h1>
        <div
            style={{
            background: "#f0f0f0",
            padding: "30px",
            borderRadius: "10px",
            width: "350px",
            textAlign: "center",
            }}
        >
            {isMakeNewAccount ? (
            <>
                <h2>Register</h2>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                />
                <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleRegisterChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                />
                <button
                onClick={handleRegister}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#d3d3d3",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                }}
                >
                Register
                </button>
                <p style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <span
                    onClick={() => setIsMakeNewAccount(false)}
                    style={{ color: "blue", cursor: "pointer" }}
                >
                    Login here
                </span>
                </p>
            </>
            ) : (
            <>
                <h2>Login</h2>
                <input
                type="email" // Changed from "text" to "email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                />
                <button
                onClick={handleLogin}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#d3d3d3",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                }}
                >
                Login
                </button>
                <p style={{ marginTop: "10px", color: "red" }}>{errorMessage}</p>
                <p style={{ marginTop: "10px" }}>
                Don't have an account?{" "}
                <span
                    onClick={() => setIsMakeNewAccount(true)}
                    style={{ color: "blue", cursor: "pointer" }}
                >
                    Register here
                </span>
                </p>
            </>
            )}
        </div>
        </div>
    );
}

export default Login;
