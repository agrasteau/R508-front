import axios from 'axios';
import Cookies from 'js-cookie';

// Créer une instance axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Ajouter un interceptor pour ajouter le token à chaque requête
api.interceptors.request.use(config => {
  const token = Cookies.get('token'); // Récupérer le token des cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
