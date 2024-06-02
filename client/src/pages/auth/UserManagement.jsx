import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import EditUserModal from '../../components/EditUserModal';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', rank: 'Cadet', joinDate: '2023-01-01', platoons: ['Platoon 1'], permissions: ['admin'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', rank: 'Cadet', joinDate: '2023-01-15', platoons: ['Platoon 2'], permissions: ['viewlessons'] },
    // Add more mock users as needed
];

const UserManagement = ({ ranks, platoons }) => {
    const [users, setUsers] = useState(mockUsers);
    const [dropdownsVisible, setDropdownsVisible] = useState({});
    const [editingUser, setEditingUser] = useState(null);

    const toggleDropdown = (userId) => {
        setDropdownsVisible(prev => ({ ...prev, [userId]: !prev[userId] }));
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleSave = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const openEditModal = (user) => {
        setEditingUser(user);
    };

    const closeEditModal = () => {
        setEditingUser(null);
    };

    const handleRankChange = (userId, newRank) => {
        setUsers(users.map(user => user.id === userId ? { ...user, rank: newRank } : user));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-red-600 text-white">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Rank</th>
                        <th className="py-2 px-4 border-b">Join Date</th>
                        <th className="py-2 px-4 border-b">Platoons</th>
                        <th className="py-2 px-4 border-b">Is Admin</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">
                                <select value={user.rank} onChange={(e) => handleRankChange(user.id, e.target.value)}>
                                    {Object.keys(ranks).map(rank => (
                                        <option key={rank} value={rank}>{ranks[rank]}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="py-2 px-4 border-b">{user.joinDate}</td>
                            <td className="py-2 px-4 border-b">{user.platoons.join(', ')}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="checkbox"
                                    checked={user.permissions.includes('admin')}
                                    disabled
                                />
                            </td>
                            <td className="py-2 px-4 border-b relative">
                                <button className="flex items-center text-gray-700 hover:text-red-600" onClick={() => toggleDropdown(user.id)}>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                                {dropdownsVisible[user.id] && (
                                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                                        <button onClick={() => openEditModal(user)} className="block px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white">Edit</button>
                                        <button onClick={() => handleDelete(user.id)} className="block px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white">Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <EditUserModal 
                    user={editingUser}
                    ranks={ranks}
                    platoons={platoons}
                    onClose={closeEditModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default UserManagement;
