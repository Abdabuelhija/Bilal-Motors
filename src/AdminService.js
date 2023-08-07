import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const API ="https://bilal-motors.onrender.com/Admin"

// for the passport
axios.defaults.baseURL = API;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const setJWTToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const checkPassword = async (password) => {
    try {
        const response = await axios.get(`${API}`);
        if (response.data[0].Password == password) {
            const isAdminValid=await validAdmin(response.data[0].Email,response.data[0].Password);
            if (isAdminValid)
            return response.data[0];
        }
        return null;
    }
    catch (error) {
        console.error("Unable to check password:", error);
        return null;
    }
};

export const validAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API}/login`, {email, password });
        console.log(response);
        if (response.data && response.data.token) {
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            setJWTToken(token);
            return true;
        } 
        return false;
    } 
    catch (error) {
        console.error("Unable to check password:", error);
        return false;
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




