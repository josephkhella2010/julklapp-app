
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { deleteItem, fetchcartData } from '../utilities/Fetch';

interface ProductType {
  name: string;
  price: number;
  imgs?: string[];  // imgs is now optional
  ind: number;
  url: string;
}

export default function NavBar() {

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Fetch cart data when component mounts
  useEffect(() => {
    fetchcart();
  }, []);

  const fetchcart = async (): Promise<void> => {
    const data = await fetchcartData();
    console.log(data)
    setProducts(data);
  };
/////////////////////////////////////////////////////////////////////////////////////
  async function handleDelete(ind: number,counter:number): Promise<void> {
    await deleteItem(ind);
   const updatedProducts = products.filter((item) => item.ind !== ind);
    setProducts(updatedProducts); 
    // here correct the mount according to item index
    const currentStock = Number(localStorage.getItem(`stock-${ind}`)) || 0;
    const newStock = currentStock + counter;
    localStorage.setItem(`stock-${ind}`, String(newStock));
    fetchcart()
    window.location.href = window.location.href;

  }
///////////////////////////////////////////////////////////////////////////////
  // Sum total price of all products
  useEffect(() => {
    const sumTotal = products.reduce((acc, product) => acc + product.price, 0);
    setTotal(sumTotal);
  }, [products]); 

  return (
    <nav>
      <ul>
        <Link to="/" className="li">Home</Link>
        <div className="cart-container">
          <p className='cart-number'>{products.length}</p>
          <FaCartPlus
            className="cart-sign"
            onClick={() => setShowSubMenu(!showSubMenu)}
          />
          {showSubMenu && (
  <div className="sub-menu">
    {products.length > 0 ? (
      products.map((product, index) => (
        <div key={index} className="sub-menu-section">
          <img
            src={product.url}
            alt={product.name}
            style={{ width: '50px', height: '70px' }}
          />
          <div className="text-container">
          <p>Name: {product.name}</p>
          <p>Price: {product.price.toFixed(2)} kr</p>
          <p> quantity:{product.counter} stycke</p>
          </div>
          <button onClick={() => handleDelete(product.ind,product.counter)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No products found</p>
    )}
    <h5>Total: {total.toFixed(2)} kronor</h5> 
  </div>
)}

        </div>
      </ul>
    </nav>
  );
}

