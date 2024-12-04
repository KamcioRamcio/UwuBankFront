import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to UwU Bank</h1>
            <div className="space-y-4">
                <Link to="/emp/login" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Employee Login
                </Link>
                <Link to="/emp/main" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Employee Main
                </Link>
                <Link to="/create-employee" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Create Employee
                </Link>
                <Link to="/customer/login" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Customer Login
                </Link>
                <Link to="/customer/main" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Customer Main
                </Link>
                <Link to="/create-customer" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                    Create Customer
                </Link>
            </div>
        </div>
    );
}

export default MainPage;