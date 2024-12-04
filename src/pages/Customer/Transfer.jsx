import React from "react";

function Transfer({isOpen, onClose, children}) {
    if (!isOpen) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <button onClick={onClose} className="absolute top-32 right-48 text-3xl font-bold text-red-500">&times;</button>
                {children}
            </div>
        </div>
    )
}
export default Transfer;