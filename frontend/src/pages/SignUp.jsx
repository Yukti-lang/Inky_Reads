import React, { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom' 
import axios from "axios"
const SignUp = () => {
  const [Values, setValues] = useState({
    username:"", email:"", password:"", address:""
  })
  const navigate = useNavigate()

  const change = (e) => {
    const {name, value} = e.target;
    setValues({ ...Values, [name]: value  })
  }
  const submit = async () => {
   try {
    if( Values.username==="" || Values.email==="" || Values.password==="" ||Values.address==="" )
    {
      alert("All fields are required")
    }
    else {
      const response = await axios.post("http://localhost:1000/api/v1/signup", Values)
      alert(response.data.message)
      navigate("/LogIn")
    }
   } catch (error) {
    console.log(error)
   }
  };
  return (
    <div className="h-[87vh] lg:h-auto bg-white px-12 py-8 flex items-center justify-center">
      <div className="bg-pink-300 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-black text-xl font-semibold">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-black">
              Username
            </label>
            <input
            type="text"
            className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-black">
              Email
            </label>
            <input
               type="text"
               className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
               placeholder="xyz@example.com"
               name="email"
               required 
               value={Values.email}
            onChange={change}
            />
          </div>
          <div className="mt-4">
              <label htmlFor="" className="text-black ">
                Password
              </label>
              <input 
              type="password"
              className="w-full mt-2 bg-sky-400 text-black p-2 outline-none "
              placeholder="password"
              name="password"
              required
              value={Values.password}
            onChange={change}
              />
          </div>
          <div className="mt-4">
              <label htmlFor="" className="text-black">
                  Address
              </label>
              <textarea
               className="w-full mt-2 bg-sky-400 text-black p-2 outline-none  "
               rows="5"
               placeholder="address"
               name="address"
               required
               value={Values.address}
            onChange={change}
               />
          </div>
          <div className="mt-4">
              <button className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200 transition-all duration-300"
              onClick={submit}
              >
                SignUp
              </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-black font-semibold">
            Already have an account ? &nbsp; 
            <Link to="/login" className="hover:text-white">
            <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default SignUp
