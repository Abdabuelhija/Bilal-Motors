import React, { useState, useEffect } from 'react';
import './SearchStyle.css';
import '../GeneralStyles/Card.css';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Logo from '../GeneralStyles/Logo.png';

export default function SearchPage() {
  document.title = "Bilal Motors - Search";
  const [cars, setCars] = useState([]);
  const [carNum, setCarNum] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [customer, setCustomer] = React.useState("");


  const Search = async (event) => {
    event.preventDefault();
    async function fetchCars() {
      const response = await axios.get('https://64620338491f9402f4b02aa1.mockapi.io/Cars');
      let carsData = response.data;
      if(carNum !== "") {
        carsData = carsData.filter(car => car.carNumber.includes(carNum));
      }
      if(carName !== "") {
        carsData = carsData.filter(car => car.Name.toLowerCase().includes(carName.toLowerCase()));
      }
      if(customer !== "") {
        carsData = carsData.filter(car => car.CustomerName.toLowerCase().includes(customer.toLowerCase()));
      }
  
      setCars(carsData);
    }
    fetchCars();
  }
  
  
    
  return (
    <>
      <div className='searchGridBody'>
      <div className="SearchFormDiv"> 
      <h1 style={{textAlign:'left',marginLeft:'20px'}}> <FontAwesomeIcon icon={faBars} size='2xs'/> Search</h1>
        <form method="post" className='SearchForm' onSubmit={Search}>
          <input type="text" placeholder='car ID' onChange={(event) => setCarNum(event.target.value)} /><br/>
          <input type="text"  placeholder='car name' onChange={(event) => setCarName(event.target.value)} /><br/>
          <input type="text"  placeholder='customer name' onChange={(event) => setCustomer(event.target.value)}/><br/>
          <input type="submit" value="search" />
        </form>
      </div>
      <div className='ResultDiv'>
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
      </div>
      </div>
    </>
  );
}
