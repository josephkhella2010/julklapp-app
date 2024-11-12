import React from 'react'
import { Link } from 'react-router-dom'

interface ProductType{
    ind:number,
    name:string,
    price:number,
    url:string,
    imgs?:string[]

  }
  interface ProductTypeTwo {
    item:ProductType
    index:number
  }
export default function ProductItems({item,index}:ProductTypeTwo) {
    const{ind,name,price,url}=item
  return (
    <div className='card'>
        <Link to={`/productdetails/${ind}`} state={item} className='card-section'>
        <img src={url} alt={name} />
        <div className="text-container">
            <div className="text">
                <h5> Product Name: {name}</h5>
                <h5> Price: {price} kr</h5>
                <h5>Description:</h5>
                <p>Lorem ipsum dolor sit, commodi odit nisi quae,commodi odit nisi quae.</p>
            </div>
            <div className="btn-container">
                <button>Add to Cart</button>
            </div>
        </div>
        </Link>
    </div>
  )
}
