import React, { useState, useEffect } from 'react';

const EditLessonModal = ({ lesson, isOpen, onClose, onSave }) => {
    const [lessonTitle, setLessonTitle] = useState('');
    const [datePresenting, setDatePresenting] = useState('');

    useEffect(() => {
        if (lesson) {
            setLessonTitle(lesson.name);
            setDatePresenting(lesson.datePresenting);
        }
    }, [lesson]);

    const handleSave = () => {
        onSave({
            ...lesson,
            name: lessonTitle,
            datePresenting,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Lesson</h2>
                <div className="mb-4">
                    <label htmlFor="lessonTitle" className="block text-gray-700 text-sm font-bold mb-2">Lesson Title</label>
                    <input
                        type="text"
                        id="lessonTitle"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        className="shadow border border-red-600 w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="datePresenting" className="block text-gray-700 text-sm font-bold mb-2">Date Presenting</label>
                    <input
                        type="date"
                        id="datePresenting"
                        value={datePresenting}
                        onChange={(e) => setDatePresenting(e.target.value)}
                        className="shadow border border-red-600 w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 border border-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditLessonModal;
