import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BookCard = ({ data, favourite }) => {
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  }
  const handleRemoveBook =async () => {
    const response =await axios.put("http://localhost:1000/api/v1/deletebookfromfavourite",
      {},
      {headers}
    ) 
    alert(response.data.message)
  }
  return (
    <div className="bg-sky-300 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
      <div className="">
        <div className="bg-sky-500 rounded flex items-center justify-center">
          <img src={data.url} alt="/" className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl text-black font-semibold" >{data.title}</h2>
        <p className="mt-2 text-zinc-700 font-semibold" >by {data.author}</p>
        <p className="mt-2 text-xl text-black font-semibold" >₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
        onClick={handleRemoveBook}
        >
          Remove your favourite
        </button>
      )}
    </div >
  ) 
}
  
export default BookCard 