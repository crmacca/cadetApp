import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const mockLessons = [
  { id: 1, name: 'Lesson 1', uploader: 'John Doe (john@example.com)', rank: 'Cadet', datePresenting: '2023-01-01', uploadDate: '2022-12-01', file: `${window.location.origin}/file/c8.pdf` },
  { id: 2, name: 'Lesson 2', uploader: 'Jane Smith (jane@example.com)', rank: 'Cadet', datePresenting: '2023-01-15', uploadDate: '2022-12-15', file: `${window.location.origin}/file/big2.xlsx` },
  // Add more mock lessons as needed
];

const FileViewer = ({globalVars}) => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const selectedLesson = mockLessons.find((lesson) => lesson.id === Number(fileId));
    setLesson(selectedLesson);
  }, [fileId]);

  const goBack = () => {
    navigate('/app/lesson-viewer');
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = lesson.file;
    link.download = lesson.name;
    link.click();
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const docs = [{ uri: lesson.file }];

  return (
    <div className="p-8">
      <button onClick={goBack} className="text-red-600 hover:underline mb-4">Back to Lesson Viewer</button>
      <button onClick={downloadFile} className="text-blue-600 hover:underline mb-4 ml-4">Download File</button>
      <h2 className="text-3xl font-bold text-red-600 mb-4">{lesson.name}</h2>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        </div>
        <div className="w-1/3 pl-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Lesson Details</h3>
            <p><strong>Title:</strong> {lesson.name}</p>
            <p><strong>Uploader:</strong> {lesson.uploader}</p>
            <p><strong>Rank:</strong> {lesson.rank}</p>
            <p><strong>Email:</strong> {lesson.uploader}</p>
            <p><strong>Upload Date:</strong> {lesson.uploadDate}</p>
            <p><strong>Presenting Date:</strong> {lesson.datePresenting}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;
