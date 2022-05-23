import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../api";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import SinglePost from './SinglePost';
import { Container, TextField } from "@mui/material";


const Posts = ({ token, posts, setPosts }) => {
    
    const fetchPosts = async () => {
      const allPosts = await fetchAllPosts(token);
      setPosts(allPosts);
    }

    const [searchTerm, setSearchTerm] = useState('');

    // check if string includes search term
    function postMatches(post, text) {
      return (post.title.includes(text) || post.description.includes(text) || 
              post.price.includes(text) || post.location.includes(text) || 
              post.author.username.includes(text));
    }

    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    useEffect(() => {
      fetchPosts();
      // eslint-disable-next-line
    }, []);

    // display all posts
    return (
      <Container maxWidth='lg'>

        {/* search bar */}
        <form id='search-form'>
            <TextField id="search-bar" label="Search..." variant="standard" onChange={(e) => setSearchTerm(e.target.value)}/>
        </form>
        {
          postsToDisplay.map(post => {
            return (
              <section className='post' key={post._id}>
                  <div>
                      <h3>{post.title}</h3>
                      <p>Description: {post.description}</p>
                      <p>Location: {post.location}</p>
                      <p>Price: {post.price}</p>
                      {post.willDeliver ? <p>Will Deliver: Yes</p> : <p>Will Deliver: No</p>}
                      <p>Last updated: {post.updatedAt}</p>
                      <p>Post by: {post.author.username}</p>
                  </div>
                  {/* display different button based on isAuthor, if not logged in, send user to login page */}
                  {post.isAuthor ? <Button variant="outlined">
                                     <Link to={`/posts/${post._id}`} element={<SinglePost />}>View My Post</Link>
                                   </Button> :
                                   <Button variant="outlined">
                                     {token ? <Link to={`/posts/${post._id}`} element={<SinglePost />}>Send Message</Link> :
                                              <Link to='/login'>Send Message</Link>
                                     }
                                   </Button>
                  }
              </section>
            )
          })
        }
      </Container>
    )
}

export default Posts;