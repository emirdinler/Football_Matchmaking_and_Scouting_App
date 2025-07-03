const BASE_URL = "https://localhost:9001";

// 🟢 Giriş yapma
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// 🟢 Kayıt olma
export async function register(userData) {
  const response = await fetch(`${BASE_URL}/api/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return await response.json();
}

// 🟢 Token ile korunan endpoint'e istek
export async function getPlayers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/Player`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await response.json();
}
