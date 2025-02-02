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
        <div className="font-primary flex flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300">
          {/* Main Wrapper with rounded corners */}
          <div className="flex flex-col lg:flex-row rounded-[3vw] bg-white/50 p-6 m-8 w-full h-full">
            <div className="flex flex-col items-center justify-center h-full bg-white text-black">
              <h1 className="mb-5 text-4xl font-bold">Welcome to LunaFlow</h1>
              <div className="bg-gradient-to-br from-cyan-200/50 to-red-200/50 p-8 m-10 rounded-lg w-[400px] text-center">
                {isMakeNewAccount ? (
                  <>
                    <h2 className="text-xl font-semibold">Register</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={handleRegister}
                      className="w-full p-3 bg-gray-300 text-black rounded-md cursor-pointer"
                    >
                      Register
                    </button>
                    <p className="mt-4">
                      Already have an account?{" "}
                      <span
                        onClick={() => setIsMakeNewAccount(false)}
                        className="text-blue-500 cursor-pointer"
                      >
                        Login here
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">Login</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={handleLogin}
                      className="w-full p-3 bg-gray-300 text-black rounded-md cursor-pointer"
                    >
                      Login
                    </button>
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                    <p className="mt-4">
                      Don't have an account?{" "}
                      <span
                        onClick={() => setIsMakeNewAccount(true)}
                        className="text-blue-500 cursor-pointer"
                      >
                        Register here
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    export default Login;
