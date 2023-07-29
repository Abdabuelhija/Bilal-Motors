import React, { useState } from 'react';
import { resetPassword, sendMail } from "../UserService";

export default function ResetPassword() {
    document.title = "Bilal Motors - Reset Password";

    const [randomNumber, setRandomNumber] = useState(null);
    const [userRandomInput, setuserRandomInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [mailSent, setMailSent] = useState(false);
    const [Message, setMessage] = useState("");
    const formStyle = {
        margin: '20px',
        padding: '20px',
        border: '1px solid black'
    };
    const handleSendMail = async () => {
        const random = Math.floor(Math.random() * (3000 - 50 + 1) + 50);
        setRandomNumber(random);
        const response = await sendMail(random);
        if (response) {
            setMailSent(true); 
            setMessage("We Send the mail ");
        }
        else {
            setMessage("unknown error");
        }
    };

    const validateNumber = (event) => {
        event.preventDefault();
        if (userRandomInput == randomNumber) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
            alert("Incorrect number, please check the mail and try again");
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        const response = await resetPassword(newPassword);
        if (response) {
            setMessage("The new Password Saved Successfully ");
        }
        else {
            setMessage("unknown error");
        }

    }

    return (
        <>
            {Message && <small>{Message}</small>} <br/>
            To reset your password we're sending you an email to verify you're the real admin.<br/>
            <button onClick={handleSendMail}>Send mail</button><br />
            {mailSent && 
                <div>
                    We sent you a number in the email, type it here :
                    <form style={formStyle} onSubmit={validateNumber}>
                        <label> The number that you received: </label>
                        <br/>
                        <input type="text" onChange={e => setuserRandomInput(e.target.value)} />
                        <br/>
                        <button type="submit">Verify</button>
                    </form>
                </div>
            }
            {isVerified &&
                <form style={formStyle} onSubmit={handleResetPassword}>
                    <label>Reset password</label>
                    <input
                        type="password"
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                    />
                    <button type="submit">Reset</button>
                </form>
            }
        </>
    );
}
