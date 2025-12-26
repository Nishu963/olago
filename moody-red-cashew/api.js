const API_URL = "https://infallible-dust.onrender.com/api";

export const signup = async (username, password) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
export const requestRide = async (token, pickup, destination) => {
  const res = await fetch(`${API_URL}/rides/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ pickup, destination }),
  });
  return res.json();
};

export const backendHealth = async () => {
  const res = await fetch(`${API_URL}/test`);
  return res.json();
};
