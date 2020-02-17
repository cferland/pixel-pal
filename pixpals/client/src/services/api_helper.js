import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000"
})

export const getUser = async (username) => {
  const resp = await api.get(`/users/${username}`);
  return resp.data.id;
}

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData);
  console.log(resp);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
  localStorage.setItem('authToken', resp.data.auth_token);
  localStorage.setItem('userId', resp.data.user.id);
  localStorage.setItem('username', resp.data.user.username);
  localStorage.setItem('email', resp.data.user.email);
  localStorage.setItem('currency', resp.data.user.currency);
  return resp.data.user;
}

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/signup', registerData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
    localStorage.setItem('authToken', resp.data.auth_token);
    localStorage.setItem('userId', resp.data.user.id);
    localStorage.setItem('username', resp.data.user.username);
    localStorage.setItem('email', resp.data.user.email);
    localStorage.setItem('currency', resp.data.user.currency);
    return resp.data.user;
  } catch(e) {
    console.log(e.response);
    if (e.response.status === 422) {
      return {errorMessage: "Email is already associated with a user, please login to continue"}
    }
  }
}

export const verifyUser = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

export const indexAvatars = async () => {
  const resp = await api.get('/avatars');
  return resp.data;
}

export const postAvatar = async (postData) => {
  const resp = await api.post('/avatars', postData);
  localStorage.setItem('avatar_base', resp.data.base);
  localStorage.setItem('avatar_hair', resp.data.hair);
  localStorage.setItem('avatar_outfit', resp.data.outfit);
  localStorage.setItem('avatar_id', resp.data.id);
  return resp.data;
}

export const loadAvatar = async (id) => {
  const resp = await api.get(`/avatars/${id}`);
  localStorage.setItem('avatar_base', resp.data.base);
  localStorage.setItem('avatar_hair', resp.data.hair);
  localStorage.setItem('avatar_outfit', resp.data.outfit);
  localStorage.setItem('avatar_id', resp.data.id);
  return resp.data;
}

export const getAvatar = async (id) => {
  const resp = await api.get(`/avatars/${id}`);
  return resp.data;
}

export const putAvatar = async (id, postData) => {
  const resp = await api.put(`/avatars/${id}`, postData);
  return resp.data;
}

export const indexItems = async () => {
  const resp = await api.get('/items');
  return resp.data;
}

export const loadItem = async (id) => {
  const resp = await api.get(`/items/${id}`);
  return resp.data;
}

export const addInventory = async (postData) => {
  const resp = await api.post('/inventories', postData);
  console.log(resp.data);
  return resp.data;
}

export const loadInventory = async () => {
  const resp = await api.get('/inventories');
  return resp.data;
}

export const deleteInventory = async (id) => {
  const resp = await api.delete(`/inventories/${id}`);
  return resp.data;
}

export const setCurrency = async (id, amount) => {
  const resp = await api.put(`/users/${id}`, { currency: amount });
  localStorage.setItem('currency', amount)
  return resp.data;
}

export const indexComments = async (avatarId) => {
  const resp = await api.get(`/avatars/${avatarId}/comments`);
  return resp.data;
}

export const postComment = async (avatarId, content) => {
  const resp = await api.post(`/avatars/${avatarId}/comments`, content);
  return resp.data;
}

export const deleteComment = async (avatarId, commentId) => {
  const resp = await api.delete(`/avatars/${avatarId}/comments/${commentId}`);
  return resp.data;
}
