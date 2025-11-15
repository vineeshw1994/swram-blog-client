const API = 'http://apibgway.genzcodershub.com/';

export const api = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text()); 
  return res.json();
};

export const authApi = async (path, options = {}) => {
  const token = localStorage.getItem('accessToken');
  return api(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};