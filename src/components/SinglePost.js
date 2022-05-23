import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, TextField, Checkbox, FormControlLabel, Alert } from "@mui/material";
import { deletePost, editPost, sendMessage } from "../api";

const SinglePost = ({ posts, token }) => {
    let { postId } = useParams();

    // try to pass single post in Posts.js <Link>, but not working
    // so get the selected post from all posts
    const post = posts.filter(post => post._id === postId)[0];
    let navigate = useNavigate();

    const [displayEditForm, setDisplayEditForm] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [price, setPrice] = useState(post.price);
    const [location, setLocation] = useState(post.location);
    const [willDeliver, setWillDeliver] = useState(post.willDeliver);

    const [message, setMessage] = useState('');
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // ask user to confirm delete, after delete, back to home
    const handleDelete = async () => {
        if(window.confirm('Are you sure to delete this post?') === true) {
            await deletePost(postId, token);
            navigate("/posts", { replace: true });
        }
    }

    // patch data
    const handleEdit = async (event) => {
        event.preventDefault();
        location ? await editPost(title, description, price, location, willDeliver, postId, token) :
                   await editPost(title, description, price, undefined, willDeliver, postId, token);
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setWillDeliver(false);
        navigate("/posts", { replace: true });
    }

    // send message, display success message when done
    const handleMessage = async (event) => {
        event.preventDefault();
        const data = await sendMessage(postId, token, message);
        
        if(data.success) {
            setDisplaySuccess(true);
            const displayMessage = setTimeout(() => {
                setDisplaySuccess(false);
                setMessage('');
                clearTimeout(displayMessage);
            }, 2000);
        }
    }

    return (
        <Container maxWidth='lg'>
            <section id='single-post'>
                {/* display basic information */}
                <div>
                    <h3>{post.title}</h3>
                    <p>Description: {post.description}</p>
                    <p>Location: {post.location}</p>
                    <p>Price: {post.price}</p>
                    {post.willDeliver ? <p>Will Deliver: Yes</p> : <p>Will Deliver: No</p>}
                    <p>Last updated: {post.updatedAt}</p>
                    <p>Post by: {post.author.username}</p>
                </div>
                {/* if isAuthor, display edit and delete button, else, display message form */}
                {post.isAuthor ? 
                <div>
                    <Button variant="outlined" onClick={() => {setDisplayEditForm(!displayEditForm)}}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                </div> :
                <form id='message-form' onSubmit={handleMessage}>
                    <TextField id="message" label="Message" variant="outlined" value={message}
                               required type="text" onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" type="submit">Send</Button>
                    {displaySuccess ? <Alert severity="success">Success! Message Sent!</Alert> : null}
                </form>
                }
                {/* display edit form after user clicked edit button, user can cancel or save */}
                {displayEditForm ?
                <form id='edit-form' onSubmit={handleEdit}>
                    <h3>Edit Your Post Below</h3>
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
                                      label="Will Deliver" checked={willDeliver}
                    />
                    <Button variant="contained" type="submit">Save Changes</Button>
                    <Button variant="outlined" onClick={() => {setDisplayEditForm(!displayEditForm)}}>Cancel</Button>
                </form> :
                null
                }
            </section>
        </Container>
    )
}

export default SinglePost;