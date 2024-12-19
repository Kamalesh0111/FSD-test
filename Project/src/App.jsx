import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/login";
import Sign from "./components/sign";
import Form from "./components/form";
import ViewFormData from "./components/view";
import './index.css'
const App = () =>{
  return(<Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/sign" element={<Sign/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/view" element={<ViewFormData/>}/>
    </Routes>
  </Router>)
}

export default App;