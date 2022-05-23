import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ token, setToken }) => {
    let navigate = useNavigate();

    // log out button clicked, clear local storage, set token to null
    const handleClick = () => {
        window.localStorage.clear();
        setToken(null);
        // back to home page
        navigate("/posts", { replace: true });
    }

    // display different links based on token
    return (
        <div id='nav-bar'>
            <Link to='/posts'>Posts</Link>
            {token ? <Link to='/profile'>Profile</Link> : null}
            {token ? <Link to='/add-post'>Add Post</Link> : null}
            {token ? <Button variant="contained" onClick={handleClick}>Log Out</Button> : 
                     <Link to='/login'>Login/Register</Link>}
        </div>
    )
}

export default Nav;