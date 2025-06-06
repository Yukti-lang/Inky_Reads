import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
      <h1 className=" text-4xl lg:text-6xl font-semibold text-black text-center lg:text-left">Explore Your Next </h1>
      <h1 className=" text-4xl lg:text-6xl font-semibold text-pink-500 text-center lg:text-left">Great Read</h1>
      <p className="mt-4 text-xl text-black text-center lg:text-left">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books </p>
      <div className="mt-8">
        <Link to="/all-books" className="text-black text-xl lg:text-2xl font-semibold border border-black px-10 py-3 hover:bg-black hover:text-white rounded-full traansition-all duration-300 ">Discover Books</Link>
      </div>
      </div>
      <div className="w-full  lg:w-3/6">
      <img src="./Hero.png" alt="hero" />
      </div>
    </div>
  )
}

export default Hero
