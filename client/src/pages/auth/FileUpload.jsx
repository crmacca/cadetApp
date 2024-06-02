import React, { useState } from 'react';

const FileUpload = ({ currentPlatoon }) => {
    const [file, setFile] = useState(null);
    const [lessonTitle, setLessonTitle] = useState('');
    const [datePresenting, setDatePresenting] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            platoon: currentPlatoon,
            file,
            lessonTitle,
            datePresenting
        });
        alert('Lesson uploaded!');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">File Upload for {`Platoon ${currentPlatoon}`}</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                    <label htmlFor="fileUpload" className="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
                    <input
                        type="file"
                        id="fileUpload"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="shadow border border-red-600 w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FileUpload;
