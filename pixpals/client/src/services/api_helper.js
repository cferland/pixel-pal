import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000"
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData);
  console.log(resp);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
  localStorage.setItem('authToken', resp.data.auth_token);
  localStorage.setItem('username', resp.data.user.username);
  localStorage.setItem('email', resp.data.user.email);
  return resp.data.user;
}

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/signup', registerData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
    localStorage.setItem('authToken', resp.data.auth_token);
    localStorage.setItem('username', resp.data.user.username);
    localStorage.setItem('email', resp.data.user.email);
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
  return resp.data;
}

export const putAvatar = async (id, postData) => {
  const resp = await api.put(`/avatars/${id}`, postData);
  const avatar = {id: id, base: resp.data.data.base, hairstyle: resp.data.data.hairstyle, outfit: resp.data.data.outfit}
  return avatar;
}
