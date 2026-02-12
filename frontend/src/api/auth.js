

// src/api/auth.js

const API_BASE_URL = "http://localhost:8088/auth";

// Helper function to handle responses
const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = "An error occurred";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }
    return await response.json();
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        return await handleResponse(response);
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName: name, email, password })
        });

        return await handleResponse(response);
    } catch (error) {
        throw error;
    }
};
