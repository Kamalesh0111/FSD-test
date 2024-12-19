import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
const Login = () =>{
        const navigate = useNavigate();
    
    const [data,setData] = useState({
        username : '',
        password : ''
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setData((prev)=>({...prev,[name] : value}))
    }

    const [message,setMessage] = useState("")
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/login',data);
            response.data.message==='Login successful' ? navigate('/form') : alert(response.data.message);

        }
        catch(err){
            setMessage(err.response.data.message);
        }
    }
    return ( <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">LOGIN PAGE</h1>
          <form 
            onSubmit={handleSubmit} 
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            {message && (
              <p className={`mt-4 text-center ${
                message.includes('successful') 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </form>
          <div className="text-center">
            <a href="/sign" className="text-blue-500 hover:text-blue-700 text-m">
              Forgot Password?
            </a>
            <br/>
            <br/>
            <a href="/sign" className="text-white bg-blue-400 hover:bg-blue-700 text-xl px-6 py-2 rounded-full border-2 border-blue-400 hover:border-blue-700 pb-3">
             Sign Up
            </a>
          </div>
        </div>
      </div>)
}

export default Login;