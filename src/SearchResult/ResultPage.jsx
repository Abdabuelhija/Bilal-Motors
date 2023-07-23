import React, { useState, useEffect } from 'react';
import './ResultStyle.css';
import '../GeneralStyles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams,Navigate ,Link } from "react-router-dom";
import LoginPage from '../LoginPage/LoginPage'
export default function ResultPage() {
  document.title="Bilal Motors - Result";
  // to print the data
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      setCars(response.data);
    }
    fetchCars();
  }, []);

  return (
    <>
      <h1>Result Here</h1>
      <div class="buttons">
    <button class="orginal-button">סדר רגיל</button>
    <button class="Entrance-button" onclick="func()">סדר לפי תאריך כניסה למגרש</button>
    <button class="Entrance-button" onclick="func()">סדר לפי תאריך מכירה</button>
        </div>
      <br/><br/><br/>
        <div class="Cars">
        {cars.map((car) => (
        <Link to={`/CarProfile/${car.ID}`} style={{ color: 'black', textDecoration: 'none' }}>
          <div class="Carcard">
            <img className='Cardimg'
              src={car.Img1}
              alt={car.Name}
            />
            <div class="container">
              <span className="CarName" style={{fontSize:'15px'}}>
                <b>{car.Name}</b>
              </span>
              <span>
                <b>Color : </b>{car.Color}
              </span>
              <span><b>Price : </b>{car.Price} <FontAwesomeIcon icon={faShekelSign} size="xs" /></span>

            </div>
          </div>
        </Link>
            ))}
      </div>
    </>
  );
}
