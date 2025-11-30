import { useEffect, useState } from 'react';
import {  authApi } from '../services/api';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { 
    authApi('api/admin/posts')
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mb-6">All Super Posts</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}