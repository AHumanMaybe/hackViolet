import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../firebase/auth";
import { useAuth } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Login() {

    const navigate = useNavigate(); // Initialize navigate at the top


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
                    loginData.email,
                    loginData.password
                );
                console.log("User ID:", curUser.user.uid);
                navigate("/dash"); // ✅ Use navigate correctly
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
    
                const curUser = await doSignInWithEmailAndPassword(
                    registerData.email,  // Fixed from `loginData.email`
                    registerData.password
                );
                console.log("User ID:", curUser.user.uid);
                navigate("/reg"); // ✅ Use navigate correctly
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
          <div className="flex flex-col lg:flex-row rounded-[3vw] justify-center bg-white/50 p-6 m-8 w-full h-full">
            <div className="flex flex-col items-center p-20 justify-center rounded-[1.5vw] h-full text-black">
             <h1 className="mb-5 text-[2vw] font-bold text-transparent bg-clip-text font-extrabold bg-gradient-to-tr from-rose-800/80 to-blue-800/80">Welcome to LunaFlow</h1>
              <div className="bg-white p-20 m-8 rounded-xl w-[800px] text-center shadow-lg shadow-[rgba(255, 130, 207, 0.97)_0px_0px_15px_0px,rgba(14, 191, 250, 0.5)_0px_0px_15px_0px]">
                {isMakeNewAccount ? (
                  <>
                    <h2 className="text-[2vw] font-light mb-6">Register</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-indigo-300 rounded-xl"
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-indigo-300 rounded-xl"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full p-3 mb-3 border border-indigo-300 rounded-xl"
                    />
                    <button
                      onClick={handleRegister}
                      className="w-full p-3 mt-10 mb-15 bg-indigo-300/80 hover:bg-indigo-500 hover:font-semibold text-black hover:text-white rounded-xl cursor-pointer 
                        transition-all duration-300 ease-in-out 
                        hover:shadow-xl hover:shadow-sky-200"
                    >
                      Start your journey now ➜
                    </button>
                    <p className="mt-4">
                      Come here often?{" "}
                      <span
                        onClick={() => setIsMakeNewAccount(false)}
                        className="text-indigo-500 font-bold hover:text-amber-500 cursor-pointer"
                      >
                           Login here
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[2vw] font-light mb-6">Log In</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full p-3 mb-3 border border-indigo-300 rounded-xl"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full p-3 mb-3 border border-indigo-300 rounded-xl"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full p-3 mt-10 mb-15 bg-indigo-300/80 hover:bg-indigo-500 hover:font-semibold text-black hover:text-white rounded-xl cursor-pointer 
                        transition-all duration-300 ease-in-out 
                        hover:shadow-xl hover:shadow-sky-200"
                        >
                        Let's go ➜
                    </button>
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                    <p className="mt-4">
                      New here?{" "}
                      <span
                        onClick={() => setIsMakeNewAccount(true)}
                        className="text-indigo-500 font-bold hover:text-amber-500 cursor-pointer"
                      >
                        Sign up!
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

