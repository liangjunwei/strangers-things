import React, { useState, useEffect } from "react";
import { fetchUserData } from "../api";
import { Container } from "@mui/material";

const Profile = ({ token }) => {
  const [myData, setMyData] = useState(null);

  const fetchUser = async () => {
    const userData = await fetchUserData(token);
    setMyData(userData);
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);
 
  // display all messages(sent/received) and user's own posts
  return (
        <Container maxWidth='lg'>
          <h1>Profile</h1>
          <section>
            {  //first two renders is initial state, it will cause map error
              myData ? <>
                <h3>Messages Received/Sent</h3>
                {
                  myData.data.messages.map((message) => {
                    return(
                      <div className='message' key={message._id}>
                        <p>Message: {message.content}</p>
                        {message.fromUser.username === myData.data.username ? <p>From: me</p> : <p>From: {message.fromUser.username} To: Me</p>}
                        <p>Post: {message.post.title}</p>
                      </div>
                    )
                  })
                }
                <br/>
                <br/>
                <h3>My Posts</h3>
                {
                  myData.data.posts.map((post) => {
                    return (
                      <div className='my-post' key={post._id}>
                        <p>Title: {post.title}</p>
                        <p>Description: {post.description}</p>
                        <p>Price: {post.price}</p>
                        {post.active ? null : <p style={{color: 'red'}}>(Deleted)</p>}
                      </div>
                    )
                  })
                }
              </> : 
              null
            }
          </section>
        </Container>
    )
}

export default Profile;