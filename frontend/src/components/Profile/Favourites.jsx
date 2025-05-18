import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from "../BookCard/BookCard";

const  Favourites =() => {
const [FavouriteBooks, setFavouriteBooks] = useState()
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/getfavouritebooks", 
        {headers}
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  },[FavouriteBooks]);
  return (
    <>
    { FavouriteBooks && FavouriteBooks.length === 0 && (
      <div className="text-5xl h-[77vh] font-semibold text-white flex items-center justify-center flex-col w-full ">
        No favourite books
        <img src="./bookmark.png" alt="" className="h-[20vh] my-8"/>
      </div >
      )}
    <div className="grid grid-cols-3 gap-4">
      
      {FavouriteBooks && FavouriteBooks.map((items,i)=>(
      <div key={i}>
      <BookCard data={items} favourite={true} />
      </div>
    ))}
      </div>
      </>
  )
}

export default Favourites