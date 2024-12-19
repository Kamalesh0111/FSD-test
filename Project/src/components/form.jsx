import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: ''
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const currentDate = new Date();
    const formattedMaxDate = currentDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!data.firstName || !data.lastName) {
            tempErrors.name = "Name is required.";
            isValid = false;
        }

        if (!data.employeeId || data.employeeId.length > 10) {
            tempErrors.employeeId = "Employee ID must be alphanumeric and no more than 10 characters.";
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!data.email || !emailRegex.test(data.email)) {
            tempErrors.email = "Enter a valid email.";
            isValid = false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!data.phone || !phoneRegex.test(data.phone)) {
            tempErrors.phone = "Phone number must be a 10-digit number.";
            isValid = false;
        }

        if (!data.department) {
            tempErrors.department = "Department is required.";
            isValid = false;
        }

        if (!data.dateOfJoining || data.dateOfJoining > formattedMaxDate) {
            tempErrors.dateOfJoining = "Date of joining cannot be a future date.";
            isValid = false;
        }

        if (!data.role) {
            tempErrors.role = "Role is required.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/form', data);
                setMessage(response.data.message);
            } catch (error) {
                setMessage("Error occurred: " + error.message);
            }
        } else {
            setMessage("Please fix the errors in the form.");
        }
    };

    const handleReset = () => {
        setData({
            firstName: '',
            lastName: '',
            employeeId: '',
            email: '',
            phone: '',
            department: '',
            dateOfJoining: '',
            role: ''
        });
        setErrors({});
        setMessage("");
    };
    const navigate = useNavigate();
    const buttonClick = () =>{
        navigate('/view');
    }
    return (
        <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Employee Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={data.firstName}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={data.lastName}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              onChange={handleChange}
              value={data.employeeId}
              maxLength="10"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              value={data.phone}
              pattern="[0-9]{10}"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              name="department"
              onChange={handleChange}
              value={data.department}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            
            <input
              type="date"
              name="dateOfJoining"
              onChange={handleChange}
              value={data.dateOfJoining}
              required
              max={formattedMaxDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              name="role"
              placeholder="Role"
              onChange={handleChange}
              value={data.role}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Reset
              </button>
            </div>
            
            {message && (
              <p className="text-center text-green-600 mt-4">{message}</p>
            )}
          </form>
          
          {Object.keys(errors).length > 0 && (
            <ul className="mt-4 space-y-2">
              {Object.values(errors).map((error, index) => (
                <li 
                  key={index} 
                  className="text-red-600 bg-red-50 p-2 rounded-md text-center"
                >
                  {error}
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-4 text-center">
            <button 
              onClick={buttonClick}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              View Data
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Form;
