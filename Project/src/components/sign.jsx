import {React,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Sign = () =>{

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
            const response = await axios.post('http://localhost:5000/sign',data);
            alert(response.data.message);
            response.data.message==="Form data saved successfully!" ? navigate('/') : setMessage(response.data.message)
        }
        catch(error){
            setMessage("error occured"+error);
        }
    }

    const clickLogin = () =>{
      navigate('/')
    }
    return( <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Signup form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name='username' 
              placeholder="Username or Email" 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type='password' 
              name='password' 
              placeholder="Password" 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
            
            <p className="text-center text-red-500">{message}</p>

          </form>
          <button 
              onClick={clickLogin} 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              LOGIN PAGE
            </button>
        </div>
      </div>)
}

export default Sign;