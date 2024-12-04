import React from "react";
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import './index.css';

import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import EmployeeMain from "./pages/Employee/EmployeeMain";
import CustomerLogin from "./pages/Customer/CustomerLogin";
import CustomerMain from "./pages/Customer/CustomerMain";
import CreateEmployee from "./pages/CreateEmployee";
import CreateCustomer from "./pages/CreateCustomer";
import MainPage from "./pages/MainPage"; // Import the MainPage component

function App() {
  return (
      <div>
          <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} /> {/* Set MainPage as the default route */}
                    <Route path="/emp/login" element={<EmployeeLogin/>} />
                    <Route path="/emp/main" element={<EmployeeMain/>} />
                    <Route path="/create-employee" element={<CreateEmployee />} />
                    <Route path="/customer/login" element={<CustomerLogin/>} />
                    <Route path="/customer/main" element={<CustomerMain/>} />
                    <Route path="/create-customer" element={<CreateCustomer />} />
                </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;