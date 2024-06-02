import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import CreateAccessCodeModal from '../../components/CreateAccessCodeModal';

const mockAccessCodes = [
    { id: 1, code: 'ABC123', rank: 'Cadet', uses: 5, permissions: ['upload'], platoons: ['Platoon 1'] },
    { id: 2, code: 'XYZ789', rank: 'SGT', uses: 2, permissions: ['viewlessons', 'upload'], platoons: ['Platoon 2'] },
    // Add more mock access codes as needed
];

const AccessCodeManagement = ({ ranks, platoons }) => {
    const [accessCodes, setAccessCodes] = useState(mockAccessCodes);
    const [dropdownsVisible, setDropdownsVisible] = useState({});
    const [showModal, setShowModal] = useState(false);

    const toggleDropdown = (codeId) => {
        setDropdownsVisible(prev => ({ ...prev, [codeId]: !prev[codeId] }));
    };

    const handleDelete = (codeId) => {
        setAccessCodes(accessCodes.filter(code => code.id !== codeId));
    };

    const handleCreateCode = (newCode) => {
        setAccessCodes([...accessCodes, { ...newCode, id: accessCodes.length + 1 }]);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Access Code Management</h2>
            <button onClick={() => setShowModal(true)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 mb-4">Create Code</button>
            <table className="min-w-full bg-white border">
                <thead className="bg-red-600 text-white">
                    <tr>
                        <th className="py-2 px-4 border-b">Code</th>
                        <th className="py-2 px-4 border-b">Rank</th>
                        <th className="py-2 px-4 border-b">Uses</th>
                        <th className="py-2 px-4 border-b">Permissions</th>
                        <th className="py-2 px-4 border-b">Platoons</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accessCodes.map(code => (
                        <tr key={code.id}>
                            <td className="py-2 px-4 border-b">{code.code}</td>
                            <td className="py-2 px-4 border-b">{ranks[code.rank]}</td>
                            <td className="py-2 px-4 border-b">{code.uses}</td>
                            <td className="py-2 px-4 border-b">{code.permissions.join(', ')}</td>
                            <td className="py-2 px-4 border-b">{code.platoons.join(', ')}</td>
                            <td className="py-2 px-4 border-b relative">
                                <button className="flex items-center text-gray-700 hover:text-red-600" onClick={() => toggleDropdown(code.id)}>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                                {dropdownsVisible[code.id] && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                                        <button onClick={() => handleDelete(code.id)} className="block px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white">Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <CreateAccessCodeModal 
                    ranks={ranks}
                    platoons={platoons}
                    onClose={() => setShowModal(false)}
                    onSave={handleCreateCode}
                />
            )}
        </div>
    );
};

export default AccessCodeManagement;
