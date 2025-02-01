import { useState } from 'react';

function Login() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ email: '', username: '', password: '' });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        console.log('Logging in with:', loginData);
    };

    const handleRegister = () => {
        console.log('Registering with:', registerData);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#ffffff', color: '#000', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', fontSize: '36px', fontWeight: 'bold' }}>Welcome to Luna Flow</h1>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ background: '#f0f0f0', padding: '30px', borderRadius: '10px', width: '350px', textAlign: 'center' }}>
                    <h2>Login</h2>
                    <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button onClick={handleLogin} style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#d3d3d3', color: '#000', border: 'none', cursor: 'pointer' }}>Login</button>
                </div>
                
                <div style={{ background: '#f0f0f0', padding: '30px', borderRadius: '10px', width: '350px', textAlign: 'center' }}>
                    <h2>Register</h2>
                    <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="text" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button onClick={handleRegister} style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#d3d3d3', color: '#000', border: 'none', cursor: 'pointer' }}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Login;