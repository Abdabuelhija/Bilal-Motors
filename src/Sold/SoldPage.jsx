import React, { useState, useEffect } from 'react';
import './SoldStyle.css';
import '../GeneralStyles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams,Navigate ,Link } from "react-router-dom";
import LoginPage from '../LoginPage/LoginPage'
export default function SoldPage() {
  document.title="Bilal Motors - Sold";
  const [cars, setCars] = useState([]);
  useEffect(() => {
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      const SoldCars = response.data.filter(car => car.isSold);
      setCars(SoldCars);
    }
    fetchCars();
  }, []);

  const ShowSoldCars = async (event) => {
    event.preventDefault();
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      const SoldCars = response.data.filter(car => car.isSold);
      setCars(SoldCars);
    }
    fetchCars();
  }
  
  const ShowByEntranceDate = async (event) => {
    event.preventDefault();
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      const soldCars = response.data.filter(car => car.isSold);
      const sortedData =  soldCars.sort((a, b) =>  new Date(b.EntranceDate) -  new Date(a.EntranceDate)); 
      setCars(sortedData);
    }
    fetchCars();
  }
  
  const ShowBySellingDate = async (event) => {
    event.preventDefault();
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      const soldCars = response.data.filter(car => car.isSold);
      const sortedData = soldCars.sort((a, b) => new Date(b.SellingDate) - new Date(a.SellingDate));
  
      setCars(sortedData);
    }
    fetchCars();
  }
  

  return (
    <>
      <div class="buttons" >
    <button class="orginal-button" onClick={ShowSoldCars}>All</button>
    <button class="Entrance-button" onClick={ShowByEntranceDate}>Filter By Entrance Date</button>
    <button class="Entrance-button" onClick={ShowBySellingDate} >Filter By Sell Date</button>
        </div>
      <br/><br/><br/>
        <div class="Cars">
        {cars.map((car) => (
      <Link to={`/CarProfile/${car.id}`} style={{ color: 'black', textDecoration: 'none' }}>
      <div class="Carcard">
        <img className='Cardimg' src={car.Img1} alt={car.Name}/>
        <div class="container">
          <span className="CarName" style={{fontSize:'15px'}}><b>{car.Name}</b></span>
          <span><b>Year : </b>{car.Year}</span>
          <span><b>hand : </b>{car.Hand} </span>
          <span><b>Capacity : </b>{car.Capacity} </span>
          <span><b>Km : </b>{car.Km}</span>
        </div>
      </div>
    </Link>
            ))}
      </div>
    </>
  );
}
