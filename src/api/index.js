import axios from "axios";

<<<<<<< HEAD
const API = axios.create({ baseURL: "https://reactbackend-demo.onrender.com" });
=======
const API = axios.create({ baseURL: 'https://reactbackend-demo.onrender.com/' });
>>>>>>> 2eb9e98dc3db0e3707f675c9cfd0d930dddca814
// const url = 'https://reactbackend-demo.onrender.com/posts';
// const url = 'http://localhost:3000/posts';

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
