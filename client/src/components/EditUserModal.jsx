import React, { useState } from 'react';

const EditUserModal = ({ user, ranks, platoons, onClose, onSave }) => {
    const [selectedRank, setSelectedRank] = useState(user.rank);
    const [selectedPermissions, setSelectedPermissions] = useState(user.permissions);
    const [selectedPlatoons, setSelectedPlatoons] = useState(user.platoons);

    const handleSave = () => {
        onSave({
            ...user,
            rank: selectedRank,
            permissions: selectedPermissions,
            platoons: selectedPlatoons
        });
        onClose();
    };

    const handlePermissionChange = (permission) => {
        setSelectedPermissions(prev => 
            prev.includes(permission) ? prev.filter(p => p !== permission) : [...prev, permission]
        );
    };

    const handlePlatoonChange = (platoon) => {
        setSelectedPlatoons(prev => 
            prev.includes(platoon) ? prev.filter(p => p !== platoon) : [...prev, platoon]
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-xl w-96">
                <h3 className="text-xl font-bold mb-4">Edit User</h3>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rank</label>
                        <select 
                            value={selectedRank} 
                            onChange={(e) => setSelectedRank(e.target.value)} 
                            className="w-full border border-gray-300 rounded p-2">
                            {Object.keys(ranks).map(rank => (
                                <option key={rank} value={rank}>{ranks[rank]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Permissions</label>
                        <div className="flex flex-wrap">
                            {['admin', 'viewlessons', 'upload'].map(permission => (
                                <label key={permission} className="w-1/2">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedPermissions.includes(permission)} 
                                        onChange={() => handlePermissionChange(permission)}
                                        className="mr-2" 
                                    />
                                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Platoons</label>
                        <div className="flex flex-wrap">
                            {platoons.map(platoon => (
                                <label key={platoon.id} className="w-1/2">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedPlatoons.includes(platoon.name)} 
                                        onChange={() => handlePlatoonChange(platoon.name)}
                                        className="mr-2" 
                                    />
                                    {platoon.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2">Cancel</button>
                    <button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
