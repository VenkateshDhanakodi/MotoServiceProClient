import React, { useState } from 'react';
import './AuthPage.css';
import Lottie from 'lottie-react';
import signInAni from '../../Assets/Animation/relax.json';
import signUpAni from '../../Assets/Animation/relax.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../Redux/Reducers/authSlice';
import { port } from '../../App'
import { toast } from 'react-toastify';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to switch between Sign In, Sign Up, and Forget Password
    const toggleForm = (formType) => {
        setIsSignIn(formType === 'signIn');
        setIsSignUp(formType === 'signUp');
        setIsForgetPassword(formType === 'forgetPassword');
    };

    // Function to handle sign-in
    const handleSignIn = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post(`${port}/api/signIn`, { email, password });
            if (response.status === 200) {
                const { userName, token } = response.data.user;
                toast.success(`Welcome ${userName}`);
                console.log('Sign-in success:', response.data);
                // Updating the Redux store
                dispatch(setAuth({ userName, token }));
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error('Sign-in error:', error);
        }
    };

    // Function to handle sign-up
    const handleSignUp = async (event) => {
        event.preventDefault();
        const formData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            mobile: event.target.mobile.value,
            password: event.target.password.value,
        };

        try {
            const response = await axios.post(`${port}/api/signUp`, formData);
            toast.success(response.data.message);
            navigate('/signin')
        } catch (error) {
            toast.error(error.response.data.message)
            console.error('Sign-up error:', error);
        }
    };

    // Function to handle password reset
    const handlePasswordReset = async (event) => {
        event.preventDefault();
        const email = event.target.emailForgetPassword.value;

        try {
            const response = await axios.post(`${port}/api/forgetPassword`, { email });
            console.log('Password reset request success:', response.data);
            toast.info(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Password reset request error:', error);
        }
    };

    return (
        <div className="container auth-container" id='signin'>
            <div className="row">
                <div className="col-md-6 animation-container">
                    {/* Lottie animation on the left side */}
                    <Lottie
                        animationData={
                            isSignIn
                                ? signInAni
                                : isSignUp
                                    ? signUpAni
                                    : isForgetPassword
                                        ? signUpAni
                                        : null
                        }
                        className="animate"
                    />
                </div>
                <div className="col-md-6">
                    {isSignIn && !isForgetPassword && !isSignUp && (
                        <>
                            <h2>Sign In</h2>
                            <form onSubmit={handleSignIn}>
                                <div className="form-group">
                                    <label htmlFor="emailSignIn">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailSignIn"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordSignIn">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordSignIn"
                                        name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <a href="#signin" onClick={() => toggleForm('forgetPassword')}>
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="form-group">
                                    <a href="#signin" onClick={() => toggleForm('signUp')}>
                                        Not a member? Register now.
                                    </a>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </form>
                        </>
                    )}
                    {isSignUp && (
                        <>
                            <h2>Sign Up</h2>
                            <form onSubmit={handleSignUp}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailSignUp">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailSignUp"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Mobile">Mobile</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobile"
                                        name="mobile"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordSignUp">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordSignUp"
                                        name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <a href="#signin" onClick={() => toggleForm('signIn')}>
                                        Already a member? Sign In.
                                    </a>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </form>
                        </>
                    )}
                    {isForgetPassword && (
                        <>
                            <h2>Forget Password</h2>
                            <form onSubmit={handlePasswordReset}>
                                <div className="form-group">
                                    <label htmlFor="emailForgetPassword">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailForgetPassword"
                                        name="emailForgetPassword"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Reset Password
                                </button>
                            </form>
                            <div className="form-group">
                                <a href="#signIn" onClick={() => toggleForm('signIn')}>
                                    Back to Sign In
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
