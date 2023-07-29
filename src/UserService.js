import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const API = "https://64620338491f9402f4b02aa1.mockapi.io/Admin";

export const checkPassword = async (password) => {
    try {
        if (password === '1234') {
            const user = {
                Email:"BilalMotors23@gmail.com",
                Password: '1234'
            };
            return user;
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

// export const checkPassword = async (password) => {
//     try {
//         const response = await axios.get(`${API}`);
//         if (response.data.password === password) { 
//             const user = {
//                 Email: response.data.Email,
//                 Password: response.data.password
//             };
//             return user;
//         }
//         return null;
//     }
//     catch (error) {
//         console.error(error);
//         return null;
//     }
// };

export const resetPassword  = async (password) => {
    try {
      const response = await axios.put(`${API}`,password);
      return true;
    } 
    catch (error) {
      console.error(error);
      return false;
    }
  };

  export const sendMail = async (random) => {
        //Send Mail
        return true;
  };
  