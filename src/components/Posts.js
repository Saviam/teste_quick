import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Erro ao buscar posts: ' + error.message);
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 pt-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Posts</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="p-4 border border-gray-200 rounded bg-gray-50">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
