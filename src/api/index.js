const BASE_URL = 'https://strangers-things.herokuapp.com/api';
const COHORT_NAME = 'junweistrangerthings';

// fetch all posts
export const fetchAllPosts = async (token) => {
    const url = `${BASE_URL}/${COHORT_NAME}/posts`;
    
    try {
        const response = token ? await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }) : await fetch(url);
        const data = await response.json();
        return data.data.posts;
    }
    catch(e) {
        console.error(e);
    }
}

// register
export const createAccount = async (username, password) => {
    const url = `${BASE_URL}/${COHORT_NAME}/users/register`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error(e);
    }
}

// login
export const userLogin = async (username, password) => {
    const url = `${BASE_URL}/${COHORT_NAME}/users/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}

// add post
export const createPost = async (title, description, price, location, willDeliver, token) => {
    const url = `${BASE_URL}/${COHORT_NAME}/posts`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}

// delete post
export const deletePost = async (postId, token) => {
    const url = `${BASE_URL}/${COHORT_NAME}/posts/${postId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}

// edit post
export const editPost = async (title, description, price, location, willDeliver, postId, token) => {
    const url = `${BASE_URL}/${COHORT_NAME}/posts/${postId}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}

// send message
export const sendMessage = async (postId, token, content) => {
    const url = `${BASE_URL}/${COHORT_NAME}/posts/${postId}/messages`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content
                }
            })
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}

// fetch messages and posts for logged in user
export const fetchUserData = async (token) => {
    const url = `${BASE_URL}/${COHORT_NAME}/users/me`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch(e) {
        console.error("error:", e);
    }
}