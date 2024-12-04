import React from "react";
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom'
import './index.css';

import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import EmployeeMain from "./pages/Employee/EmployeeMain";

import CustomerLogin from "./pages/Customer/CustomerLogin";
import CustomerMain from "./pages/Customer/CustomerMain";

function App() {
  return (
      <div>
          <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/emp/login" />} />
                    <Route path="/emp/login" element={<EmployeeLogin/>} />
                    <Route path="/emp/main" element={<EmployeeMain/>} />

                    <Route path="/customer/login" element={<CustomerLogin/>} />
                    <Route path="/customer/main" element={<CustomerMain/>} />
                </Routes>
          </BrowserRouter>
      </div>
  )
}
export default App;