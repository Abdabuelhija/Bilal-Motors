import React, { useState, useEffect } from 'react';
import './CarProfileStyle.css';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { getCarById, updateCarById, markCarAsSold } from "../CarService";

export default function CarProfile() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [Message, setMessage] = useState("");
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  const [car, setCar] = useState({
    carNumber: "",
    Name: "",
    Year: "",
    Hand: 0,
    Capacity: "",
    EntranceDate: "",
    isSold: false,
    CustomerName: "",
    SellingDate: "",
    Notes: "",
    Img1: "",
    Img2: "",
    Price: 0,
    Km: 0,
  });

  useEffect(() => {
    const fetchCar = async () => {
      const fetchedCar = await getCarById(id);
      if (fetchedCar) {
        setCar(fetchedCar);
        document.title = `Bilal Motors - ${fetchedCar.Name}`;
      }
    };
    fetchCar();
  }, [id]);

  // Update Modal
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => {
    setshowUpdateModal(false);
    setMessage("");
  
  }
  const handleUpdateModalShow = () => setshowUpdateModal(true);
  const updateCarDetails = async (event) => {
    event.preventDefault();
    try {
      const updatedCar = await updateCarById(id, car);
      if (updatedCar) {
        setCar(updatedCar);
        setMessage("The changes were successfully saved.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Modal
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => {
    setshowDeleteModal(false);
    setMessage("");
  }
  const handleDeleteModalShow = () => setshowDeleteModal(true);
  const SoldCar = async (event) => {
    event.preventDefault();
    try {
      const soldCar = await markCarAsSold(id, car);
      if (soldCar) {
        setCar(soldCar);
        setMessage("The changes were successfully saved.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title><br /><h2>Update information's</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Message && <small style={{ color: 'green' }}>{Message}</small>}

          <form class="row" onSubmit={updateCarDetails}>
            <div class="form-group col-md-6">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" name="Name" value={car.Name} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputYear">Year</label>
              <input type="text" class="form-control" id="inputYear" value={car.Year} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputHand">Hand</label>
              <input type="number" class="form-control" id="inputHand" value={car.Hand} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputCapacity">Capacity</label>
              <input type="text" class="form-control" id="inputCapacity" value={car.Capacity} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputKm">Km</label>
              <input type="text" class="form-control" id="inputKm" value={car.Km} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-6">
              <label for="inputPrice">Price</label>
              <input type="text" class="form-control" id="inputPrice" value={car.Price} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-12">
              <label for="inputPrice">car number</label>
              <input type="text" class="form-control" id="inputPrice" value={car.carNumber} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-12">
              <label for="inputNotes">Notes</label>
              <input type="text" class="form-control" id="Notes" value={car.Notes} onChange={handleInputChange} required />
            </div>

            <div class="form-group col-md-12">
              <label for="inputImg1">image1 url</label>
              <input type="text" class="form-control" id="inputImg1" value={car.Img1} onChange={handleInputChange} required />
            </div>
            <div class="form-group col-md-12">
              <label for="inputImg2">image2 url</label>
              <input type="text" class="form-control" id="inputImg2" value={car.Img2} onChange={handleInputChange} required />
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleUpdateModalClose}>Close</Button>
              <Button variant="primary" type="submit" style={{ '--bs-btn-bg': '#1C5F8C', '--bs-btn-hover-bg': '#1C5F8C', '--bs-btn-border-Year': '#1C5F8C' }} >Update</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Message && <small style={{ color: 'red' }}>{Message}</small>}

          <form class="row" onSubmit={SoldCar}>
            <div class="form-group col-md-6">
              <label for="inputImg1">Customer Name </label>
              <input type="text" class="form-control" id="inputImg1" value={car.CustomerName} onChange={handleInputChange} required />
            </div>
            <div class="form-group col-md-6">
              <label for="inputImg1">Selling Date  </label>
              <input type="date" class="form-control" id="inputImg1" value={car.SellingDate} onChange={handleInputChange} required />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteModalClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" style={{ '--bs-btn-bg': 'red', '--bs-btn-hover-bg': 'red', '--bs-btn-border-Year': 'red' }}>Sold</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <h1>{car.Name}</h1><br/>
      <div className="Body-container">
          <Carousel activeIndex={index} onSelect={handleSelect} style={{width:'800px',textAlign:'center'}}>
            <Carousel.Item>
              <img src={car.Img1} className='ImageSlider'/>
            </Carousel.Item>
            <Carousel.Item>
              <img src={car.Img2} className='ImageSlider'/>
            </Carousel.Item>
            <Carousel.Item>
              <img src={car.Img2} className='ImageSlider'/>
            </Carousel.Item>
            <Carousel.Item>
              <img src={car.Img2} className='ImageSlider'/>
            </Carousel.Item>
            <Carousel.Item>
              <img src={car.Img2} className='ImageSlider'/>
            </Carousel.Item>
          </Carousel>
        <div className="informations">
          <div >
            <span><b>Year : </b>{car.Year}</span><br />
            <span><b> Hand:</b> {car.Hand}</span><br />
            <span><b>Capacity : </b>{car.Capacity}</span><br />
            <span><b> Km:</b> {car.Km}</span><br />
            <span><b> EntranceDate:</b> {car.EntranceDate}</span><br />
            <span><b> Car ID:</b> {car.carNumber}</span><br />
            <span><b> Sold ? :</b> {car.isSold.toString()} </span><br />
            {car.isSold === true && (
              <>
                <span><b> CustomerName:</b> {car.CustomerName}</span><br />
                <span><b> SellingDate:</b> {car.SellingDate}</span><br />
              </>
            )}
            <span><b> Price:</b> {car.Price}<FontAwesomeIcon icon={faShekelSign} size="xs" /></span><br />
            <span><b> Notes:</b> {car.Notes}</span><br />
            <br />
            <div className='Buttons'>
              {car.isSold === false && (
                <>
                  <button className="Delete-button" onClick={handleDeleteModalShow}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#ffffff" }} /> Sold
                  </button>
                  <button className="Update-button" onClick={handleUpdateModalShow}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffffff" }} /> Update
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
        </div>


    </>
  );
}