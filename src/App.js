import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Layout,
  Posts,
  SinglePost,
  Profile,
  Login,
  Register,
  AddPost
} from './components';

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  
  // somehow posts cannot pass to SinglePost in Post.js, so put it here
  const [posts, setPosts] = useState([]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Layout token={token} setToken={setToken}/>}>

          <Route index element={<Posts token={token} posts={posts} setPosts={setPosts}/>} />

          <Route path='/posts' element={<Posts token={token} posts={posts} setPosts={setPosts}/>} />

          <Route path='/posts/:postId' element={<SinglePost posts={posts} token={token}/>} />

          {token ? <Route path='/profile' element={<Profile token={token}/>} /> : null}

          {token ? <Route path='/add-post' element={<AddPost token={token}/>} /> : null}

          {token ? null : <Route path='/login' element={<Login setToken={setToken}/>} />}

          {token ? null : <Route path='/register' element={<Register setToken={setToken}/>} />}
          
          <Route path="*" element={<Navigate to="/" replace={true} />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
