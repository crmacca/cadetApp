import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faBook, faList, faSignOutAlt, faUsers, faKey } from '@fortawesome/free-solid-svg-icons';
import FileUpload from './FileUpload';
import LessonViewer from './LessonViewer';
import MyUploadedLessons from './MyUploadedLessons';
import UserManagement from './UserManagement';
import AccessCodeManagement from './AccessCodeManagement';

const platoons = [
    { id: 1, name: 'Platoon 1' },
    { id: 2, name: 'Platoon 2' },
    { id: 3, name: 'Platoon 3' },
    { id: 4, name: 'Platoon 4' },
    { id: 5, name: 'Platoon 5' },
    { id: 6, name: 'Platoon 6' },
];

const ranks = {
    "Cadet": "Cadet",
    "TO": "Training Officer",
    "CSM": "Company Sergeant Major",
    "SGT": "Sergeant",
    "PLI": "Platoon Leader Instructor",
    "CPL": "Corporal",
    "LCPL": "Lance Corporal"
};

const Dashboard = ({ user, globalVars }) => {
    const [currentPlatoon, setCurrentPlatoon] = useState(platoons[0].id);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('file-upload');

    useEffect(() => {
        const path = window.location.pathname.split('/')[2];
        if (path) {
            setPage(path);
        }
    }, []);

    useEffect(() => {
        if (user === 'loading') return;
        if(user === null) return window.location.pathname = '/';
        setLoading(false);
    }, [user])

    const handlePlatoonChange = (e) => {
        setCurrentPlatoon(Number(e.target.value));
    };

    const navigate = (page) => {
        setPage(page);
        window.history.pushState(null, '', `/app/${page}`);
    };

    return !loading && (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img src={globalVars.backgroundUrl} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[75%] blur-[3px]" />

            <div className="relative z-10 flex justify-center items-center w-full h-full p-8">
                <div className="bg-white border-red-600 border-[1px] shadow-xl w-full h-full p-6">
                    <div className="flex h-full">
                        <nav className="w-1/4 p-4 border-r border-gray-300 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-2xl font-bold text-red-600 mb-6">{globalVars.appName}</h2>
                                <ul className="space-y-4">
                                    <li>
                                        <button onClick={() => navigate('file-upload')} className="flex items-center text-gray-700 hover:text-red-600">
                                            <FontAwesomeIcon icon={faUpload} className="mr-2" /> File Upload
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('lesson-viewer')} className="flex items-center text-gray-700 hover:text-red-600">
                                            <FontAwesomeIcon icon={faBook} className="mr-2" /> Lesson Viewer
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('my-uploaded-lessons')} className="flex items-center text-gray-700 hover:text-red-600">
                                            <FontAwesomeIcon icon={faList} className="mr-2" /> My Uploaded Lessons
                                        </button>
                                    </li>
                                    {user.permissions.includes('admin') && (
                                        <>
                                            <li>
                                                <button onClick={() => navigate('user-management')} className="flex items-center text-gray-700 hover:text-red-600">
                                                    <FontAwesomeIcon icon={faUsers} className="mr-2" /> User Management
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => navigate('access-code-management')} className="flex items-center text-gray-700 hover:text-red-600">
                                                    <FontAwesomeIcon icon={faKey} className="mr-2" /> Access Code Management
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className='flex w-full'>
                                    <div className='flex flex-col justify-start items-start w-full'>
                                        <h1 className='text-red-500 text-lg font-bold'>{user.name}</h1>
                                        <h1 className='text-red-500 text-start text-sm font-regular'>
                                            {user.email}
                                        </h1>
                                    </div>
                                    <button className="flex items-center text-gray-700 hover:text-red-600 mb-2">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    </button>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-700">{globalVars.fullName}</p>
                                    <p className="text-gray-500 text-sm">{globalVars.email}</p>
                                </div>
                            </div>
                        </nav>
                        <div className="w-3/4 p-4">
                            <div className="mb-4">
                                <label htmlFor="platoon" className="block text-gray-700 text-sm font-bold mb-2">Select Platoon:</label>
                                <select id="platoon" value={currentPlatoon} onChange={handlePlatoonChange} className="shadow border border-red-600 w-full py-2 px-3 text-gray-700">
                                    {platoons.map(platoon => (
                                        <option key={platoon.id} value={platoon.id}>{platoon.name}</option>
                                    ))}
                                </select>
                            </div>
                            {page === 'file-upload' && <FileUpload currentPlatoon={currentPlatoon} platoons={platoons} />}
                            {page === 'lesson-viewer' && <LessonViewer currentPlatoon={currentPlatoon} platoons={platoons} />}
                            {page === 'my-uploaded-lessons' && <MyUploadedLessons currentPlatoon={currentPlatoon} platoons={platoons} />}
                            {page === 'user-management' && <UserManagement ranks={ranks} platoons={platoons} />}
                            {page === 'access-code-management' && <AccessCodeManagement ranks={ranks} platoons={platoons} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
