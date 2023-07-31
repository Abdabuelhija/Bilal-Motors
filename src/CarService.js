import axios from "axios";
const API = "https://64620338491f9402f4b02aa1.mockapi.io/Cars";



export async function fetchAllCars() {
  const response = await axios.get(`${API}`);
  return response.data;
}

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export async function addCar(car) {
  const searchCar = await axios.get(`${API}?carNumber=${car.carNumber}`);
  if (searchCar.data[0] && searchCar.data[0].isSold) {
    console.log("the car already exist in the sold cars");
    return -1;
  }
  else if (searchCar.data[0] && !searchCar.data[0].isSold) {
    console.log("the car already exist.");
    return false;
  }
  else {
    const response = await axios.post(`${API}`, car);
    return true;
  }
}


export const updateCarById = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, carData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const markCarAsSold = async (id, carData) => {
  try {
    const response = await axios.put(`${API}/${id}`, { ...carData, isSold: true });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateIsSold_toTrue = async (car) => {
  try {
    const response = await axios.get(`${API}/?carNumber=${car.carNumber}`);
    const carData = response.data;
    if (carData.length === 1) {
      carData[0].isSold = false;
      await axios.put(`${API}/${carData[0].id}`, carData[0]);
      return true;
    }
    else {
      console.log('multiple cars with the same carNumber.');
      return false;
    }
  }
  catch (error) {
    console.error(error);
    return false;
  }
};








