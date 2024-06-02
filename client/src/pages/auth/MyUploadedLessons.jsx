import React, { useState, useEffect } from 'react';
import EditLessonModal from '../../components/EditLessonModal.jsx';

const mockUploadedLessons = [
    { id: 1, name: 'Lesson 1', thumbnail: 'path/to/thumbnail1.jpg', uploadDate: '2022-12-01', datePresenting: '2022-12-20' },
    { id: 2, name: 'Lesson 2', thumbnail: 'path/to/thumbnail2.jpg', uploadDate: '2022-12-15', datePresenting: '2023-01-15' },
    // Add more mock uploaded lessons as needed
];

const MyUploadedLessons = ({ currentPlatoon }) => {
    const [uploadedLessons, setUploadedLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setUploadedLessons(mockUploadedLessons);
    }, []);

    const handleDelete = (id) => {
        setUploadedLessons(uploadedLessons.filter(lesson => lesson.id !== id));
        alert('Lesson deleted!');
    };

    const handleEdit = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    const handleSave = (updatedLesson) => {
        setUploadedLessons(uploadedLessons.map(lesson => lesson.id === updatedLesson.id ? updatedLesson : lesson));
    };

    const isDeletable = (uploadDate) => {
        const uploadedDate = new Date(uploadDate);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - uploadedDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        return dayDiff <= 3;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Uploaded Lessons for {`Platoon ${currentPlatoon}`}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {uploadedLessons.map((lesson) => (
                    <div key={lesson.id} className="border shadow p-4 relative">
                        <img src={lesson.thumbnail} alt={lesson.name} className="w-full h-32 object-cover" />
                        <h3 className="text-lg font-bold mt-2">{lesson.name}</h3>
                        <p className="text-sm text-gray-600">Upload Date: {lesson.uploadDate}</p>
                        <p className="text-sm text-gray-600">Date Presenting: {lesson.datePresenting}</p>
                        <div className="absolute top-2 right-2 text-gray-600">
                            <button className="mr-2" onClick={() => handleEdit(lesson)}>&#9998;</button>
                            {isDeletable(lesson.uploadDate) && <button onClick={() => handleDelete(lesson.id)}>&#x1F5D1;</button>}
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <EditLessonModal
                    lesson={selectedLesson}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default MyUploadedLessons;
