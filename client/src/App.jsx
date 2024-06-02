import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/unauth/Login.jsx';
import SignupPage from './pages/unauth/Signup.jsx';
import FileViewer from './pages/auth/FileViewer.jsx';
import Dashboard from './pages/auth/Dashboard.jsx';

function App() {
  const [user, setUser] = useState('loading');
  const [globalVars, setGlobalVars] = useState({
    appName: 'PHSACU',
    fullName: 'PHSACU (Pittwater House Australian Cadet Unit)',
    backgroundUrl: 'https://images.unsplash.com/photo-1620059116993-398c21ce8406?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  });

  useEffect(() => {
    setUser({
      id: 'a1-b2-c3',
      name: 'John Doe',
      email: 'firstname.lastname@cadetunit.com',
      topRole: {
        id: 'a1-b2-c3',
        name: 'Cadet',
        description: 'Cadet'
      },
      permissions: [
        'admin',
        'upload',
        'viewlessons',
      ]
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage user={user} globalVars={globalVars} />,
    },
    {
      path: '/signup',
      element: <SignupPage user={user} globalVars={globalVars} />,
    },
    {
      path: '/app',
      element: <Dashboard user={user} globalVars={globalVars} />,
    },
    {
      path: '/app/:page',
      element: <Dashboard user={user} globalVars={globalVars} />,
    },
    {
      path: '/app/file/:fileId',
      element: <FileViewer user={user} globalVars={globalVars} />,
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
