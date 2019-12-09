import axios from 'axios';
// Fake API: json-server server.json -p 3333 [-w]

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
