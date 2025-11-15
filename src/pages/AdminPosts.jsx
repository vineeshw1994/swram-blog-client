import { useEffect, useState } from 'react';
import { authApi } from '../services/api';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    authApi('api/admin/posts') 
      .then(setPosts)
      .catch(() => alert('Unauthorized'));  
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const newPost = await authApi('api/admin/post', {
      method: 'POST',
      body: JSON.stringify({ title, description: desc }),
    });
    setPosts([newPost, ...posts]);
    setTitle('');
    setDesc('');
  };

  const remove = async (id) => {
    await authApi(`api/admin/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      <form onSubmit={create} className="mb-6 p-4 bg-white rounded shadow">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Post
        </button>
      </form>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.description}</p>
            </div>
            <button
              onClick={() => remove(post._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}