import axios from 'axios';
import { config } from 'dotenv';

config();

axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem(
  'token'
)}`;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default axios;
