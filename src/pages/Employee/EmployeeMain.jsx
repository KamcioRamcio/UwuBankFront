import React from 'react';

function EmployeeMain() {
    const empData = JSON.parse(localStorage.getItem('empData'));
    const { employee, customers, branch } = empData;

    const handleLogout = () => {
        localStorage.removeItem('empData');
        window.location.href = '/emp/login';
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Employee Dashboard</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/profile" className="hover:underline">Profile</a></li>
                            <li><a href="/settings" className="hover:underline">Settings</a></li>
                            <li><button className="hover:underline" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to the Employee Dashboard</h2>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-2">Employee Information</h3>
                    <p>Name: {employee.name}</p>
                    <p>Position: {employee.position}</p>
                    <p>Branch Name: {employee.branch.branchName}</p>
                    <p>Branch Address: {employee.branch.branchAddress}</p>
                    <p>Branch Phone: {employee.branch.branchPhoneNumber}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-2">Branch Employees</h3>
                    {employee.branch.employees.map((emp, index) => (
                        <div key={index} className="mb-4">
                            <p>Employee ID: {emp.employeeId}</p>
                            <p>Name: {emp.name}</p>
                            <p>Position: {emp.position}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Customer Information</h3>
                    {customers.map((customer, index) => (
                        <div key={index} className="mb-4">
                            <p>Customer Account: todo</p>
                            <p>Customer ID: {customer.customerId}</p>
                            <p>Name: {customer.name} {customer.surname}</p>
                            <p>PESEL: {customer.pesel}</p>
                            <p>Address: {customer.address}</p>
                            <p>Phone Number: {customer.phoneNumber}</p>
                            <p>Email: {customer.email}</p>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 UwU Bank. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default EmployeeMain;