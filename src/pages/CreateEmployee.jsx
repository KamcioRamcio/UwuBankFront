import React, { useState } from 'react';
import apiUrl from "../constants/api";

function CreateEmployee() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [branchId, setBranchId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const accountData = {
            employee: {
                name,
                position,
                branchId: parseInt(branchId)
            },
            user: {
                username,
                password,
                role: 'EMPLOYEE'
            }
        };

        try {
            const response = await fetch(apiUrl + "employees", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountData),
            });

            if (!response.ok) {
                throw new Error('Account creation failed');
            }

            const data = await response.json();
            console.log('Account created successfully:', data);
            setSuccess('Account created successfully');
        } catch (error) {
            console.error('Error:', error);
            setError('Account creation failed. Please check the details and try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create Employee Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position:</label>
                    <select
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a position</option>
                        <option value="TELLER">TELLER</option>
                        <option value="CUSTOMER_SERVICE_REPRESENTATIVE">CUSTOMER_SERVICE_REPRESENTATIVE</option>
                        <option value="LOAN_OFFICER">LOAN_OFFICER</option>
                        <option value="BRANCH_MANAGER">BRANCH_MANAGER</option>
                        <option value="FINANCIAL_ADVISOR">FINANCIAL_ADVISOR</option>
                        <option value="ACCOUNTANT">ACCOUNTANT</option>
                        <option value="IT_SPECIALIST">IT_SPECIALIST</option>
                        <option value="COMPLIANCE_OFFICER">COMPLIANCE_OFFICER</option>
                        <option value="OPERATIONS_MANAGER">OPERATIONS_MANAGER</option>
                        <option value="SECURITY_OFFICER">SECURITY_OFFICER</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="branchId" className="block text-sm font-medium text-gray-700">Branch ID:</label>
                    <input
                        type="number"
                        id="branchId"
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default CreateEmployee;