import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// const API = "http://localhost:8000/Admin";
// const API = `${process.env.API}/Admin`;
const API = `https://main--iridescent-frangollo-bd6271.netlify.app/Admin`;
export const checkPassword = async (password) => {
    try {
        const response = await axios.get(`${API}`);
        if (response.data[0].Password == password) {
            return response.data[0];
        }
        return null;
    }
    catch (error) {
        console.error("Unable to check password:", error);
        return null;
    }
};

export const resetPassword = async (password) => {
    try {
        const response = await axios.put(`${API}`,{Password: password});
        if (response.status === 200) {
            return true;
        }
        else {
            console.error("Unable to reset password, status code:", response.status);
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const sendMail = async (random) => {
    try {
        const response = await axios.post(`${API}/sendmail`, { random });
        if (response.status === 200) {
            return true;
        } else {
            console.error("Unable to send mail, status code:", response.status);
            return false;
        }
    }
    catch (error) {
        console.error("Unable to send mail:", error);
        return false;
    }
};



