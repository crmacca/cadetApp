import React, { useEffect } from 'react';
import CopyrightFooter from '../../components/CopyrightFooter';

const LoginPage = ({ user, globalVars }) => {

    useEffect(() => {
        if(user !== null && user !== 'loading') {
            window.location.href = '/app';
        }
    }, [user])

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img src={globalVars.backgroundUrl} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[75%] blur-[3px]" />
            
            {/* Main Content */}
            <div className="relative z-10 flex justify-center items-center w-full h-full">
                <div className="bg-white px-8 py-5 border-red-600 border-[1px] shadow-xl md:max-w-xl w-full mx-2">
                    <h2 className="text-2xl font-bold text-red-600">{globalVars.appName}</h2>
                    <h2 className="text-xl font-regular mb-6 text-gray-700">Please authenticate to continue</h2>
                    <form>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-bold w-full py-2 px-4 border border-red-700 shadow-lg focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Sign In
                            </button>
                        </div>
                        <a className="mt-2 hover:underline" href='/signup'>Signup Page</a>
                    </form>
                    <CopyrightFooter fullName={globalVars.fullName} className='fixed w-full text-center bottom-0 left-0' />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
