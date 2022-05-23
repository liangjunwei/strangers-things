import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";

const AddPost = ({ token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if location is empty, pass undefined
        location ? await createPost(title, description, price, location, willDeliver, token) :
                   await createPost(title, description, price, undefined, willDeliver, token);
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setWillDeliver(false);
        // back to home page after post created
        navigate("/posts", { replace: true });
    }

    //new post form
    return (
        <Container maxWidth='sm' id='add-post-container'>
            <h3>Add Post</h3>
            <form id='post-form' onSubmit={handleSubmit}>
                <TextField id="title" label="Title" variant="outlined" value={title}
                           required type="text" onChange={(e) => setTitle(e.target.value)}
                />
                <TextField id="description" label="Description" variant="outlined" value={description}
                           required type="text" onChange={(e) => setDescription(e.target.value)}
                />
                <TextField id="price" label="Price" variant="outlined" value={price}
                           required type="text" onChange={(e) => setPrice(e.target.value)}
                />
                <TextField id="location" label="Location" variant="outlined" value={location}
                           type="text" onChange={(e) => setLocation(e.target.value)}
                />
                <FormControlLabel control={<Checkbox id="willDeliver" onChange={(e) => setWillDeliver(e.target.checked)}/>} 
                                  label="Will Deliver" 
                />
                <Button variant="contained" type="submit">Post</Button>
            </form>
        </Container>
    )
}

export default AddPost;