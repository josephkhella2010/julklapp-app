
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SliderComponent from '../components/SliderComponent';
import ButtonCounter from '../components/ButtonCounter';
import { getSingleApi } from '../utilities/Fetch';

interface ProductType {
  ind: number;
  name: string;
  price: number;
  url: string;
  imgs?: string[];
}

export default function ProductDetails() {
  const location = useLocation();
  const item=location.state as ProductType
  const params = useParams(); 
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
////////////////////////////////////////////////////////////////////////////////////////
// get reqest
  const getSingleItem = async () => {
    const data=await getSingleApi(Number(params.id))
    setProduct(data); 
  
  };

  useEffect(() => {
    if (!location.state) {
      getSingleItem();  
    } else {
      setProduct(item);  
    }
  }, [location.state, params.id]);

  if (!product) {
    return;
  }

  const { ind, name, price, url, imgs } = product;

  return (
    <div className="details-pages">
      <h1>Product Details Page</h1>

       
 <div 
  className="wrapper" 
  style={{
    position: 'relative', 
    overflow: 'hidden',   
  }}
>
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(1px)', 
      zIndex: -1,           
    }}
  />
         <div
          className="card-container"
         
        >
          <div className="bottom-container">
            <SliderComponent imgs={imgs} name={name} />
            <div className="text-container">
              <ButtonCounter price={price} name={name} url={url} ind={ind} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
