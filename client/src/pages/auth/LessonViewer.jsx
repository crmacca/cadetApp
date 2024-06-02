import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const mockLessons = [
    { id: 1, name: 'Lesson 1', uploader: 'John Doe (john@example.com)', rank: 'Cadet', datePresenting: '2023-01-01', uploadDate: '2022-12-01'},
    { id: 2, name: 'Lesson 2', uploader: 'Jane Smith (jane@example.com)', rank: 'Cadet', datePresenting: '2023-01-15', uploadDate: '2022-12-15' },
    // Add more mock lessons as needed
];

const LessonViewer = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        setLessons(mockLessons);
    }, []);

    const sortedLessons = React.useMemo(() => {
        if (sortConfig.key) {
            return [...lessons].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return lessons;
    }, [lessons, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleRowClick = (lessonId) => {
        navigate(`/app/file/${lessonId}`);
    };

    const isReviewNeeded = (datePresenting) => {
        const presentingDate = new Date(datePresenting);
        const uploadDate = new Date();
        const timeDiff = presentingDate.getTime() - uploadDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        return dayDiff <= 12;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Lessons</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-red-600 text-white">
                    <tr>
                        {['name', 'uploader', 'rank', 'datePresenting', 'uploadDate'].map((key) => (
                            <th
                                key={key}
                                onClick={() => requestSort(key)}
                                className="py-2 px-4 border-b cursor-pointer"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                {sortConfig.key === key && (
                                    <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} className="ml-2" />
                                )}
                            </th>
                        ))}
                        <th className="py-2 px-4 border-b">Review</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLessons.map((lesson) => (
                        <tr key={lesson.id} onClick={() => handleRowClick(lesson.id)} className="cursor-pointer">
                            <td className="py-2 px-4 border-b">{lesson.name}</td>
                            <td className="py-2 px-4 border-b">{lesson.uploader}</td>
                            <td className="py-2 px-4 border-b">{lesson.rank}</td>
                            <td className="py-2 px-4 border-b">{lesson.datePresenting}</td>
                            <td className="py-2 px-4 border-b">{lesson.uploadDate}</td>
                            <td className="py-2 px-4 border-b">
                                {isReviewNeeded(lesson.datePresenting) ? <span className="text-red-600">&#x26A0;</span> : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LessonViewer;
