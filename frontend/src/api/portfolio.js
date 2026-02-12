// src/api/portfolio.js
const API_URL = "http://localhost:8088/api/assets";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    throw new Error("Session expired. Please login again.");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text();
  }
};

export const getPortfolioData = async () => {
  const response = await fetch(`${API_URL}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    return await handleResponse(response);
  }
  return response.json();
};

export const addPortfolioHolding = async (holdingData) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(holdingData),
  });
  if (!response.ok) {
    return await handleResponse(response);
  }
  return handleResponse(response);
};

export const updatePortfolioHolding = async (id, holdingData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(holdingData),
  });
  if (!response.ok) {
    return await handleResponse(response);
  }
  return handleResponse(response);
};

export const deletePortfolioHolding = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    return await handleResponse(response);
  }
  return handleResponse(response);
};
