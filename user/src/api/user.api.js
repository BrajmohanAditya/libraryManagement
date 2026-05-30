import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;


export const registerApi = async (payload) => {
    const res = await axios.post(`${baseUrl}/admins/signup`, payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )

    return res.data
};

export const loginApi = async (payload) => {
    const res = await axios.post(`${baseUrl}/admins/login`, payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )

    return res.data
};


export const getUserApi = async () => {
    const token = localStorage.getItem("token"); // <-- Get the saved token
    const res = await axios.get(`${baseUrl}/admins/profile`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // <-- Send it to the backend!
            },
            withCredentials: true,
        }
    )

    return res.data
};


export const logOutApi = async () => {
    // 1. Delete the token from the browser's memory
    localStorage.removeItem("token");
    
    // 2. Return a success message for your React Hook
    return { message: "Logged out successfully" };
};



