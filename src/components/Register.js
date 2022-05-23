import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api";

const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if confirm password is differen from password, display error message
        if(confirmPassword !== password) {
            setMessage('Password not matched! Please try again!');
            setDisplayError(true);
            const displayMessage = setTimeout(() => {
                setDisplayError(false);
                setMessage('');
                clearTimeout(displayMessage);
            }, 2000);
        }
        else {
            const data = await createAccount(username, password);
            // if register success, store and set token, back to home page
            if(data.success) {
                window.localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate("/posts", { replace: true });
            }
            // if register failed, display error message
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
    }

    // sign up form
    return (
        <Container maxWidth='sm' id='signup-container'>
            <h3>Register</h3>
            <form id='signup-form' onSubmit={handleSubmit}>
                <TextField id="username" label="Username" variant="outlined" value={username}
                           required type="text" onChange={(e) => setUsername(e.target.value)}
                />
                <TextField id="password" label="Password" variant="outlined" value={password}
                           required type="password" onChange={(e) => setPassword(e.target.value)}
                />
                <TextField id="confirm-password" label="Confirm Password" variant="outlined" value={confirmPassword}
                           required type="password" onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button variant="contained" type="submit">Sign Up</Button>
            </form>
            {displayError ? <Alert severity="error">{message}</Alert> : null}
        </Container>
    )
}

export default Register;