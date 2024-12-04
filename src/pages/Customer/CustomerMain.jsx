import React, { useEffect, useState, useCallback } from "react";
import Transfer from "./Transfer";
import OwnTransfer from "./OwnTransfer";
import apiUrl from "../../constants/api";

function CustomerMain() {
    const customerData = JSON.parse(localStorage.getItem('customerData'));
    const { customer } = customerData;
    const [accounts, setAccounts] = useState([]);
    const [isTransferOpen, setIsTransferOpen] = useState(false);
    const [isOwnTransferOpen, setIsOwnTransferOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedFromAccount, setSelectedFromAccount] = useState('');
    const [selectedToAccount, setSelectedToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [error, setError] = useState(null);
    const [transferData, setTransferData] = useState(null);
    const [ownTransferData, setOwnTransferData] = useState(null);
    const [incomes, setIncomes] = useState(null);
    const [outcomes, setOutcomes] = useState(null);
    const [cards, setCards] = useState([]);
    const [cardType, setCardType] = useState('');
    const [limit, setLimit] = useState('');
    const [selectedCardAccount, setSelectedCardAccount] = useState('');

    const fetchAccounts = useCallback(async () => {
        const response = await fetch(apiUrl + 'accounts/' + customer.customerId);
        const data = await response.json();
        setAccounts(data);
    }, [customer.customerId]);

    const fetchTransfers = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + 'transfers/customer/' + customer.customerId);
            const data = await response.json();
            console.log('Transfers:', data);
            setTransferData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [customer.customerId]);

    const fetchOwnTransfers = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + 'transfers/customer/own/' + customer.customerId);
            const data = await response.json();
            console.log('Own Transfers:', data);
            setOwnTransferData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [customer.customerId]);

    const fetchIncomes = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + 'transactions/incomes/' + customer.customerId);
            const data = await response.json();
            console.log('Incomes:', data);
            setIncomes(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [customer.customerId]);

    const fetchOutcomes = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + 'transactions/outcomes/' + customer.customerId);
            const data = await response.json();
            console.log('Outcomes:', data);
            setOutcomes(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [customer.customerId]);

    const fetchCards = useCallback(async () => {
        try {
            const response = await fetch(apiUrl + `cards/customer/${customer.customerId}`);
            const data = await response.json();
            console.log('Cards:', data);
            setCards(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [customer.customerId]);

    useEffect(() => {
        fetchAccounts();
        fetchTransfers();
        fetchOwnTransfers();
        fetchIncomes();
        fetchOutcomes();
        fetchCards();
    }, [fetchAccounts, fetchTransfers, fetchOwnTransfers, fetchIncomes, fetchOutcomes, fetchCards]);

    const handleLogout = () => {
        localStorage.removeItem('customerData');
        window.location.href = '/customer/login';
    };

    const handleTransferOpen = () => {
        setIsTransferOpen(true);
    };

    const handleTransferClose = () => {
        setIsTransferOpen(false);
    };

    const handleOwnTransferOpen = () => {
        setIsOwnTransferOpen(true);
    }

    const handleOwnTransferClose = () => {
        setIsOwnTransferOpen(false);
    }

    const handleSendTransfer = async () => {
        setError(null);
        if (!selectedAccount || !receiverId || !amount) {
            setError('Please fill in all fields');
            return;
        }

        const currentDate = new Date().toISOString();
        const senderId = customer.customerId;

        const transferData = {
            senderAccountId: selectedAccount,
            senderId,
            receiverAccountId: receiverId,
            amount: parseFloat(amount),
            currentDate
        };

        try {
            const response = await fetch(apiUrl + 'transfers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transferData),
            });

            if (!response.ok) {
                throw new Error('Transfer failed');
            }
            const data = await response.json();
            console.log('Transfer successful:', data);
            handleTransferClose();
            fetchTransfers();
            fetchOwnTransfers();
        } catch (error) {
            console.error('Error:', error);
            setError('Transfer failed. Please check the details and try again.');
        }
    };

    const handleSendOwnTransfer = async () => {
        setError(null);
        if (!selectedFromAccount || !selectedToAccount || !amount) {
            setError('Please fill in all fields');
            return;
        }

        const currentDate = new Date().toISOString();
        const ownTransferData = {
            customerId: customer.customerId,
            amount: parseFloat(amount),
            fromAccountId: selectedFromAccount,
            toAccountId: selectedToAccount,
            currentDate
        };

        try {
            const response = await fetch(apiUrl + 'transfers/own', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ownTransferData),
            });

            if (!response.ok) {
                throw new Error('Own Transfer failed');
            }

            const data = await response.json();
            console.log('Own Transfer successful:', data);
            handleOwnTransferClose();
            fetchTransfers();
            fetchOwnTransfers();
        } catch (error) {
            console.error('Error:', error);
            setError('Own Transfer failed. Please check the details and try again.');
        }
    };

    const handleCreateCard = async (event) => {
        event.preventDefault();
        setError(null);
        if (!selectedCardAccount || !cardType || !limit) {
            setError('Please fill in all fields');
            return;
        }

        const cardData = {
            customerId: customer.customerId,
            accountId: selectedCardAccount,
            cardType,
            limits: parseFloat(limit),
            status: 'toActive'
        };

        try {
            const response = await fetch(apiUrl + 'cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                throw new Error('Card creation failed');
            }

            const data = await response.json();
            console.log('Card created successfully:', data);
            fetchCards();
        } catch (error) {
            console.error('Error:', error);
            setError('Card creation failed. Please check the details and try again.');
        }
    };

    const getTransactionTitle = (variableName) => {
        const titles = {
            transfers: 'Transfers',
            ownTransfers: 'Own Transfers',
            incomes: 'Incomes',
            outcomes: 'Outcomes',
        };

        return titles[variableName] || 'Transaction';
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Customer Dashboard</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="/profile" className="hover:underline">Profile</a></li>
                            <li><a href="/settings" className="hover:underline">Settings</a></li>
                            <li><button className="hover:underline" onClick={handleLogout}>Logout</button></li>
                            <li><button className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800" onClick={handleOwnTransferOpen}>Own Transfer</button></li>
                            <li><button className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800" onClick={handleTransferOpen}>Transfer</button></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to the Customer Dashboard</h2>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-2">Customer Information</h3>
                    <p>Name: {customer.name} {customer.surname}</p>
                    <p>Address: {customer.address}</p>
                    <p>Phone Number: {customer.phoneNumber}</p>
                    <p>Email: {customer.email}</p>
                </div>
                <Transfer isOpen={isTransferOpen} onClose={handleTransferClose}>
                    <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                        <option value="">Select Account</option>
                        {accounts.map((account, index) => (
                            <option key={index} value={account.accountId}>
                                {account.accountType}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="pl-6 w-32"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="text"
                        className="pl-6"
                        placeholder="Recipient Account ID"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                    />
                    <button onClick={handleSendTransfer}>SEND</button>
                    {error && <p className="text-red-500">{error}</p>}
                </Transfer>
                <OwnTransfer isOpen={isOwnTransferOpen} onClose={handleOwnTransferClose}>
                    <select value={selectedFromAccount} onChange={(e) => setSelectedFromAccount(e.target.value)}>
                        <option value="">Select From Account</option>
                        {accounts.map((account, index) => (
                            <option key={index} value={account.accountId}>
                                {account.accountType}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="pl-6 w-32"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select value={selectedToAccount} onChange={(e) => setSelectedToAccount(e.target.value)}>
                        <option value="">Select To Account</option>
                        {accounts.map((account, index) => (
                            <option key={index} value={account.accountId}>
                                {account.accountType}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSendOwnTransfer}>SEND</button>
                    {error && <p className="text-red-500">{error}</p>}
                </OwnTransfer>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Accounts</h3>
                    {accounts.map((account, index) => (
                        <div key={index} className="mb-4">
                            <p>Account ID: {account.accountId}</p>
                            <p>Balance: {account.balance}</p>
                            <p>Account Type: {account.accountType}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Cards</h3>
                    {cards.map((card, index) => (
                        <div key={index} className="mb-4">
                            <p>Card ID: {card.cardId}</p>
                            <p>Account ID: {card.accountId}</p>
                            <p>Card Number: {card.cardNumber}</p>
                            <p>Card Type: {card.cardType}</p>
                            <p>Expiration Date: {new Date(card.expirationDate).toLocaleDateString()}</p>
                            <p>CVV: {card.cvv}</p>
                            <p>Limit: {card.limits}</p>
                            <p>Status: {card.status}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-bold mb-2">Create Card</h3>
                    <form onSubmit={handleCreateCard}>
                        <select value={selectedCardAccount} onChange={(e) => setSelectedCardAccount(e.target.value)}>
                            <option value="">Select Account</option>
                            {accounts.map((account, index) => (
                                <option key={index} value={account.accountId}>
                                    {account.accountType} (ID: {account.accountId})
                                </option>
                            ))}
                        </select>
                        <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                            <option value="">Select Card Type</option>
                            <option value="DEBIT">DEBIT</option>
                            <option value="CREDIT">CREDIT</option>
                        </select>
                        <input
                            type="number"
                            className="pl-6 w-32"
                            placeholder="Limit"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
                            Create Card
                        </button>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}
                </div>

                {[
                    {data: transferData, title: 'transfers'},
                    {data: ownTransferData, title: 'ownTransfers'},
                    {data: incomes, title: 'incomes'},
                    {data: outcomes, title: 'outcomes'},
                ].map(({data, title}, index) => (
                    Array.isArray(data) && data.length > 0 && (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <h3 className="text-lg font-bold mb-2">{getTransactionTitle(title)}</h3>
                            {data.sort((a, b) => new Date(b.date) - new Date(a.date)).map((transaction, idx) => (
                                <div key={idx} className="mb-4">
                                    <p>Date: {new Date(transaction.date).toLocaleString()}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    <p>Sender Account ID: {transaction.senderAccountId || transaction.fromAccountId || transaction.sender }</p>
                                    <p>Receiver Account ID: {transaction.receiverAccountId || transaction.toAccountId || transaction.accountId}</p>
                                </div>
                            ))}
                        </div>
                    )
                ))}
            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 UwU Bank. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default CustomerMain;