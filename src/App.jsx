import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import AdminPosts from './pages/AdminPosts';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // LOAD USER FROM localStorage ON EVERY MOUNT
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem('accessToken');
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">MicroBlog</Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:underline">Posts</Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* ADMIN LINK */}
                {isAdmin && <Link to="/admin" className="hover:underline">Admin</Link>}

                {/* USER AVATAR + INFO */}
                <div className="flex items-center gap-3">
                  <div className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs opacity-80">{user?.email}</p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/admin"
          element={isLoggedIn && isAdmin ? <AdminPosts /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;