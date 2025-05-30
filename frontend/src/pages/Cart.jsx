import React from 'react'
import Loader from "../components/Loader/Loader"
import { useState } from 'react'
import axios from 'axios'
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate()
  const [Cart , setCart ] =  useState()
  const [Total, setTotal] = useState(0)
  const [paymentMode, setPaymentMode] = useState("COD"); // default

   const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

   useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/getcartbooks", 
        {headers}
      );
      setCart(response.data.data);
    };
    fetch();
  },[Cart]);
  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/deletebookfromcart/${bookid}`,
      {} ,
      {headers}
    )
      alert(response.data.message)
  }
  useEffect(() => {
    if(Cart&& Cart.length > 0)
    {
      let total=0 ;
      Cart.map((items) => {
        total+=items.price;
      })
      setTotal(total);
      total = 0;
    }
  }, [Cart])
  const PlaceOrder = async () => {
  try {
    if (paymentMode === "COD") {
      const res = await axios.post(
        `http://localhost:1000/api/v1/placeorder`,
        { order: Cart, mode: "COD" },
        { headers }
      );
      alert(res.data.message);
      navigate("/profile/orderHistory");
    } else {
      // Dummy Payment logic (simulate success)
      alert("Payment Successful! Placing order...");
      const res = await axios.post(
        `http://localhost:1000/api/v1/placeorder`,
        { order: Cart, mode: "Online" },
        { headers }
      );
      alert(res.data.message);
      navigate("/profile/orderHistory");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};

  return (
   <div className="bg-white px-12 h-screen py-8">
    {!Cart && <div className="w-full h-[100%] flex items-center justify-center my-8"><Loader/></div>}
    {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-sky-400">
              Empty Cart
            </h1>
            <img 
              src="./bin.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
    )}
    {Cart && Cart.length > 0 && (
      <>
      <h1 className="text-5xl font-semibold text-black mb-8">
        Your Cart
      </h1>
      {Cart.map((items , i) => 
      <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-pink-300 justify-between items-center"
      keuy ={i}
      >
        <img src={items.url}
        alt="/"
        className="h-[20vh] md:h-[10vh] object-cover"
        />
        <div className="w-full md:w-auto">
          <h1 className="text-2xl text-black font-semibold text-start mt-2 md:mt-0">
              {items.title}
          </h1>
          <p className="text-normal text-black mt-2 hidden lg:block">
              {items.desc.slice(0, 100)}...
          </p>
          <p className="text-normal text-black mt-2 hidden md:block lg:hidden">
              {items.desc.slice(0, 65)}...
          </p>
          <p className="text-normal text-black mt-2 block md:hidden">
              {items.desc.slice(0, 100)}...
          </p>
        </div>
        <div className="flex mt-4 w-full md:w-auto itemss-center justify-between">
          <h2 className="text-black text-3xl font-semibold flex ">
              ₹ {items.price}
          </h2>
          <button className="bg-sky-400 text-red-700 border border-700 rounded p-2 ms-12"
          onClick={() =>deleteItem(items._id) }
          >
            <AiFillDelete />
          </button>
        </div>
      </div>
      )}
      </>
    )}
    {Cart && Cart.length > 0 && (
      <div className="mt-4 w-full flex items-center justify-end">
        <div className="p-4 bg-pink-300 rounded">
          <h1 className="text-3xl text-black font-semibold">
              Total Amount
          </h1> 
          <div className="mt-3 flex items-center justify-between text-xl text-black">
            <h2>{Cart.length} books 
            </h2>
            <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3"> 
              
             <div className="mb-4">
    <label className="text-black text-lg mr-4">Select Payment Mode:</label>
    <select
      value={paymentMode}
      onChange={(e) => setPaymentMode(e.target.value)}
      className="rounded px-2 py-1"
    >
      <option value="COD">Cash on Delivery</option>
      <option value="Online">Online Payment</option>
    </select>
  </div>
  
  <button
    className="bg-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-sky-400 transition-all duration-300"
    onClick={PlaceOrder}
  >
    {paymentMode === "COD" ? "Place your COD Order" : "Pay & Place Order"}
  </button>
              </div>
        </div>
      </div>
    ) }
   </div>
  )
}

export default Cart
