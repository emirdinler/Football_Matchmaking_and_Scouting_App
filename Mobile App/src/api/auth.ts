import axios from 'axios';

const API_BASE =  "https://localhost:9001"; // PORT numarasını kendi backend'ine göre güncelle!

export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
  const response = await axios.post(`${API_BASE}/api/Auth/register`, {
    name,
    email,
    password,
    confirmPassword
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/api/Auth/login`, {
    email,
    password
  });
  return response.data;
};
