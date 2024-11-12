 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {fetchPostData } from '../utilities/Fetch';

interface ProductType {
  name: string;
  price: number;
  url:string,
  ind:number
}

export default function ButtonCounter({ price, name,url,ind }: ProductType) {
  const [counter, setCounter] = useState<number>(1);
  const initialStock = 101; 
  const [mount, setMount] = useState<number>(
    () => Number(localStorage.getItem(`stock-${ind}`)) || initialStock
  );
  // Load mount from localStorage whenever component mounts
  useEffect(() => {
    if (!localStorage.getItem(`stock-${ind}`)) {
      localStorage.setItem(`stock-${ind}`, String(initialStock));
    }
  }, [ind, initialStock]);
   //////////////////////////////////////// 
  const handleIncrease = () => {
    if (counter < mount) {
      setCounter((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    }
  };
///////////////////////////////////////////////////////////////////////////////
async function handleAdd(){
 
    fetchPostData(name,counter,url,price,ind)
    const newStock = (mount - counter);
    setMount(newStock);
    localStorage.setItem(`stock-${ind}`, String(newStock));
    window.location.href = window.location.href;

}


  return (
    <div className="text">
      <div className="text-section">
      <h5> Product Name: {name}</h5>
      <h5>Price: {(price * counter).toFixed(2)}  kronor</h5>
      <h5> Description</h5>
      <p>Lorem ipsum, dolor sit amet consect.dolor sit amet consect dolor sit amet consect dolor sit amet consectdolor sit amet consect </p>
      <p>Det finns i Lager ({mount - counter}) styck</p>

      </div>
      <div className="btn-container">
        <div className="counter">
           <p className='stycke'>Välje hur många stycke</p>
           <div className="counter-section">
          <button onClick={handleDecrease} disabled={counter <= 1}>
            -
          </button>
          <p>{counter}</p>
          <button onClick={handleIncrease} disabled={counter >= mount-1}>
            +
          </button>
          </div> 
        </div>

        <button onClick={handleAdd}> lägg till i korg <span>({counter})</span></button>
      </div>
 
    </div>
  );
}




