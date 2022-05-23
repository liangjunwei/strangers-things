import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await userLogin(username, password);
        
        // if login success, store and set token
        if(data.success) {
            window.localStorage.setItem('token', data.data.token);
            setToken(data.data.token);
            setUsername('');
            setPassword('');
            // back to home page
            navigate("/posts", { replace: true });
        }
        // if login failed, display error message to user
        else {
            setMessage(data.error.message);
            setDisplayError(true);
            const displayMessage = setTimeout(() => {
                setDisplayError(false);
                setMessage('');
                clearTimeout(displayMessage);
            }, 2000);
        }
    }
    // login form
    return (
        <Container maxWidth='sm' id='login-container'>
            <form id='login-form' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <TextField id="username" label="Username" variant="outlined" value={username}
                           required type="text" onChange={(e) => setUsername(e.target.value)}
                />
                <TextField id="password" label="Password" variant="outlined" value={password}
                           required type="password" onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" type="submit">Login</Button>
                <Link to='/register'>Don't have an account? Sign up now!</Link>
            </form>
            {displayError ? <Alert severity="error">{message}</Alert> : null}
        </Container>
    )
}

export default Login;