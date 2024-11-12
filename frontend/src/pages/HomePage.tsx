 import React, { useEffect, useState } from 'react'
import ProductItems from '../components/ProductItems'
import { fetchData } from "../utilities/Fetch";

interface ProductType{
  ind:number,
  name:string,
  price:number,
  url:string,
  imgs?:string[]
}

export default function HomePage() {

  const [products,setProducts]=useState<ProductType[]>([])
  /////////////////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    getProduct()
  },[])

const getProduct = async ():Promise<void> => {

    const data:ProductType[]= await fetchData()
    setProducts(data);
 
};



  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className='home-page'>
      <h1>jul produkter</h1>
      <div className="card-container">
      {products&&products.map((item,index)=>{
        return(
          <ProductItems item={item} index={index} key={index}/>
        )
      })}
      </div>

    </div>
  )
}


