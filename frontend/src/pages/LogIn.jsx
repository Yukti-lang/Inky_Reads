import React, { useState } from 'react'
 import { Link, useNavigate } from 'react-router-dom' 
 import { authActions } from '../store/auth'
import axios from "axios"
import { useDispatch } from 'react-redux'

const LogIn = () => {
  const [Values, setValues] = useState({
    username:"", password:""
  })
  const dispatch = useDispatch() // useDispatch is used change the state of redux
  const navigate = useNavigate()

  const change = (e) => {
    const {name, value} = e.target;
    setValues({ ...Values, [name]: value  })
  }
  const submit = async () => {
   try {
    if( Values.username==="" || Values.password==="" )
    {
      alert("All fields are required")
    }
    else {
      const response = await axios.post("http://localhost:1000/api/v1/signin", Values)
      dispatch(authActions.login()) // useDispatch is used change the state of redux
      dispatch(authActions.changeRole(response.data.role)) // useDispatch is used change the state of redux
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)   
      navigate("/profile")
      //navigate("/LogIn")
    }
   } catch (error) {
    alert(error.response.data.message)
   }
  }
  return (
   <div className="h-[87vh] bg-sky-700 px-12 py-8 flex items-center justify-center">
      <div className="bg-sky-600 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-white text-xl font-semibold">Login</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-white">
              Username
            </label>
            <input
            type="text"
            className="w-full mt-2 bg-sky-700 text-white p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
            />
          </div>
          <div className="mt-4">
              <label htmlFor="" className="text-white ">
                Password
              </label>
              <input 
              type="password"
              className="w-full mt-2 bg-sky-700 text-white p-2 outline-none "
              placeholder="password"
              name="password"
              required
              value={Values.password}
            onChange={change}  
              />
          </div>
          <div className="mt-4">
              <button className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200" 
              onClick={submit}>
                LogIn
              </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-white font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-white font-semibold">
            Don't have an account ? &nbsp; 
            <Link to="/signup" className="hover:text-zinc-900">
            <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default LogIn
