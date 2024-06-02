import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CopyrightFooter from '../../components/CopyrightFooter';

const SignupPage = ({ globalVars }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        fullName: null,
        email: null,
        password: null,
        confirmPassword: null,
        accessCode: null,
        privacyPolicy: null
    });
    const [formData, setFormData] = useState({});
    const [confirmationData, setConfirmationData] = useState(null);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 8;
    const validateAccessCode = (code) => /^\d{6}$/.test(code);

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    const handleFullNameChange = (e) => {
        e.target.value = capitalizeWords(e.target.value);
    };

    const mockServerResponse = (accessCode) => {
        if (accessCode !== '123456') {
            return { msg: 'invalidCode' };
        }
        return { msg: 'validCode' };
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const accessCode = e.target.accessCode.value;
        const privacyPolicy = e.target.privacyPolicy.checked;

        const newErrors = {
            fullName: fullName ? null : 'Full Name is required',
            email: validateEmail(email) ? null : 'Invalid email address',
            password: validatePassword(password) ? null : 'Password must be at least 8 characters',
            confirmPassword: password === confirmPassword ? null : 'Passwords do not match',
            accessCode: validateAccessCode(accessCode) ? null : 'Invalid access code',
            privacyPolicy: privacyPolicy ? null : 'You must agree to the Privacy Policy'
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every(error => error === null)) {
            const serverResponse = mockServerResponse(accessCode);
            if (serverResponse.msg === 'invalidCode') {
                setErrors((prevErrors) => ({ ...prevErrors, accessCode: 'Invalid access code' }));
            } else {
                setFormData({ fullName, email, password, accessCode });
                setConfirmationData({ fullName, email });
            }
        }
    };

    const handleCreateAccount = () => {
        alert('Account created successfully!');
        // Here you can handle the final account creation logic.
    };

    if (confirmationData) {
        return (
            <div className="relative w-full h-screen overflow-hidden">
                {/* Background Image */}
                <img src={globalVars.backgroundUrl} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[75%] blur-[3px]" />

                {/* Main Content */}
                <div className="relative z-10 flex justify-center items-center w-full h-full">
                    <div className="bg-white px-8 py-5 border-red-600 border-[1px] shadow-xl w-full md:max-w-xl mx-2">
                        <h2 className="text-2xl font-bold text-red-600">{globalVars.appName}</h2>
                        <h2 className="text-xl font-regular mb-6 text-gray-700">Are you sure this is the name and email you wish to use?</h2>
                        <div className="mb-4">
                            <h3 className="text-gray-700 text-sm font-bold">User Details</h3>
                            <p className="text-gray-700">Full Name: {formData.fullName}</p>
                            <p className="text-gray-700">Email: {formData.email}</p>
                        </div>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white w-full font-bold py-2 px-4 border border-red-700 shadow-lg focus:outline-none focus:shadow-outline"
                            onClick={handleCreateAccount}
                        >
                            Create My Account
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img src={globalVars.backgroundUrl} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[75%] blur-[3px]" />

            {/* Main Content */}
            <div className="relative z-10 flex justify-center items-center w-full h-full">
                <div className="bg-white px-8 py-5 border-red-600 border-[1px] shadow-xl w-full md:max-w-xl mx-2">
                    <h2 className="text-2xl font-bold text-red-600">{globalVars.appName}</h2>
                    <h2 className="text-xl font-regular mb-6 text-gray-700">Create an account, please ensure you have your access code ready.</h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your full name"
                                onChange={handleFullNameChange}
                            />
                            {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <div className="flex items-center">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="ml-auto px-3 text-gray-700 h-full"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="flex items-center">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="ml-auto px-3 text-gray-700 h-full"
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessCode">Access Code</label>
                            <input
                                id="accessCode"
                                name="accessCode"
                                type="text"
                                className="shadow appearance-none border border-red-600 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your access code"
                            />
                            {errors.accessCode && <p className="text-red-600 text-xs mt-1">{errors.accessCode}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input id="privacyPolicy" name="privacyPolicy" type="checkbox" className="form-checkbox text-red-600" />
                                <span className="ml-2 text-gray-700 text-sm">I agree to the <a href="/" className="text-red-600 underline">Privacy Policy</a></span>
                            </label>
                            {errors.privacyPolicy && <p className="text-red-600 text-xs mt-1">{errors.privacyPolicy}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white w-full font-bold py-2 px-4 border border-red-700 shadow-lg focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                        <a className='hover:underline mt-2' href={window.location.origin}>Login Page</a>
                    </form>
                    <CopyrightFooter fullName={globalVars.fullName} className="fixed w-full text-center bottom-0 left-0" />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
