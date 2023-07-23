import React, { useState } from 'react';
import './LoginStyle.css';
import Logo from '../GeneralStyles/Logo.png';
import { useParams,useNavigate ,Link } from "react-router-dom";
export default function LoginPage({setUser}) {
  document.title="Bilal Motors - Login";
  const [inputValue, setInputValue] = useState('');
  const navigate =useNavigate();
  const [Message, setMessage] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue === '1234') {
      const user = {
        name: 'bilal'
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(localStorage.getItem('user'));
      navigate("/");
    }
    else {
      setMessage("Wrong password");
    }
  };
  return (
    <div className='LoginBody'>
      <div className='FormDiv'>
        <h1>Login</h1>
        <small>The temporary code is : 1234</small>
        {Message && <small style={{color:'green'}}>{Message}</small>}
        <form onSubmit={handleFormSubmit}>
          <label style={{ fontSize: '30px', color: '#702C77', fontWeight: 'bold' }}>Code</label>
          <br />
          <input type='password' value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
          <input type='submit' value='כניסה' />
        </form>
        <img src={Logo} alt='Logo' className='Logo' />
      </div>
    </div>
  );
}