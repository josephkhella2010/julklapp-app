import axios from "axios";
//get request for allproducts
export const fetchData = async () => {
  const apiUrl = "http://localhost:5000"; 
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 // get request for only cart
export const fetchcartData=async()=>{
  try {
    const apiUrl = 'http://localhost:5000/cart';
    const response = await axios.get(apiUrl);
    return response.data.cart
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
// post request for cart(add cart)
export const fetchPostData=async(name:string,counter:number,url:string,price:number,ind:number)=>{
  console.log("hi")
  try {
      const newProduct={name,counter,url,price: parseFloat((price * counter).toFixed(2)),ind}
      const res=await axios.post("http://localhost:5000/addproduct",newProduct)
      console.log(res.data)
  } catch (e) {
      console.log("error" + e)
      
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////
// delete request for cart
export  const deleteItem=async(ind:number)=>{
  const itemDeleted=await axios.delete(`http://localhost:5000/deletecart/${ind}`)
  console.log(itemDeleted)
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// get single id for params
export const getSingleApi=async(id:number)=>{
  try {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    return response.data
  } catch (error) {
    console.log("Error fetching product:", error);
  }
}