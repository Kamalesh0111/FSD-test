import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ViewFormData = () => {
    const [formData, setFormData] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/view');
                setFormData(response.data);
            } catch (error) {
                setMessage("Error occurred while fetching data: " + error.message);
            }
        };

        fetchData();
    }, []);

    const clickHandle = () =>{
        navigate('/form')
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6">View Form Data</h1>
        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}
        {formData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Joining</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-4 whitespace-nowrap">{item.firstName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.lastName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.employeeId}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.phone}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.department}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.dateOfJoining}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
        <button 
              onClick={clickHandle} 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Move to Form Page
            </button>
      </div>
    );
};

export default ViewFormData;
