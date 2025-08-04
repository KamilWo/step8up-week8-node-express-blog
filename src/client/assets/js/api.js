const BASE_URL = '/api';

// Generic fetch function
async function request(url, options = {}) {
  try {
    const response = await fetch(BASE_URL + url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An unknown error occurred');
    }
    if (response.status === 204) { // No Content
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Auth API
export const login = (email, password) => request('/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email, password}),
});

export const register = (username, email, password) => request('/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({username, email, password}),
});

export const logout = () => request('/auth/logout', {method: 'POST'});

// Posts API
export const getPosts = (categoryId = null) => {
  const url = categoryId ? `/posts?category=${categoryId}` : '/posts';
  return request(url);
};

export const createPost = (postData) =>
  request("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

export const getPostById = (postId) => request(`/posts/${postId}`);

export const updatePost = (postId, postData) =>
  request(`/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

// Categories API
export const getCategories = () => request("/categories");
