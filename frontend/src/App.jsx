import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterEmployee from "./pages/RegisterEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <Router>
      
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Employee Dashboard</h1>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 transition duration-200">
              Register Employee
            </Link>
            <Link to="/employees" className="text-white hover:text-gray-200 transition duration-200">
              Show Employees
            </Link>
          </div>
        </div>
      </nav>

      
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<RegisterEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
