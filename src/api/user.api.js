import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;


export const registerApi = async (payload) => {
    const res = await axios.post(`${baseUrl}/register`, payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )

    return res.data
};