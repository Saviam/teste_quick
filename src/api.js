
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/'; 

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const getComments = () => axios.get(`${API_URL}/comments`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (user) => axios.post(`${API_URL}/users`, user);
export const createPost = (post) => axios.post(`${API_URL}/posts`, post);
export const createComment = (comment) => axios.post(`${API_URL}/comments`, comment);
export const updatePost = (id, post) => axios.put(`${API_URL}/posts/${id}`, post);
export const updateComment = (id, comment) => axios.put(`${API_URL}/comments/${id}`, comment);
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`);
export const deleteComment = (id) => axios.delete(`${API_URL}/comments/${id}`);



export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);




