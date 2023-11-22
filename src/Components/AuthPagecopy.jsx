import React, { useState, useEffect } from 'react';
import './AuthPage.css';
import Lottie from 'lottie-react';
import signInAni from '../Assets/Animation/relax.json';
import signUpAni from '../Assets/Animation/relax.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);
    const [userName, setUserName] = useState(localStorage.getItem('user') || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
    
        if (userId) {
            // Make a request to fetch user data using the user ID
            axios.get(`http://localhost:3377/api/user/${userId}`)
            .then((response) => {
                const userData = response.data; // User data received from the API
                setUserName(userData.userName); // Set the username in your component state
            })
            .catch((error) => {
                // Handle error when fetching user data
                console.error('Error fetching user data:', error);
            });
        }
    }, []);   
  
    const toggleForm = (formType) => {
        setIsSignIn(formType === 'signIn');
        setIsSignUp(formType === 'signUp');
        setIsForgetPassword(formType === 'forgetPassword');
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
      
        try {
          const response = await axios.post('http://localhost:3377/api/signIn', { email, password });
          if (response.status === 200) {
            const { userName, _id } = response.data.user; // Extract necessary fields
            setIsLoggedIn(true);
            setUserName(userName);
            localStorage.setItem('userId', _id); // Store user ID in localStorage
            navigate('/');
          } else {
            // Handle sign-in failure
          }
        } catch (error) {
          console.error('Sign-in error:', error);
        }
      };
                  
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
            const response = await axios.post('http://localhost:3377/api/signUp', formData);
            console.log('Sign-up success:', response.data);
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        const email = event.target.emailForgetPassword.value;

        try {
            const response = await axios.post('http://localhost:3377/api/forgetPassword', { email });
            console.log('Password reset request success:', response.data);
        } catch (error) {
            console.error('Password reset request error:', error);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="container auth-container" id='signin'>
            <div className="row">
                <div className="col-md-6 animation-container">
                    <Lottie
                        animationData={isSignIn ? signInAni : isSignUp ? signUpAni : signUpAni}
                        className="animate"
                    />
                </div>
                <div className="col-md-6">
                    {isLoggedIn ? (
                        <div className="user-info">
                            <div className="user-dropdown">
                                <span className="user-icon" onClick={() => setShowDropdown(!showDropdown)}>
                                    <i className="fa fa-user"></i> {userName}
                                </span>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        <span onClick={handleSignOut}>Sign Out</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
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
                                </div>                                        <button type="submit" className="btn btn-primary">
                                            Sign In
                                        </button>
                                    </form>
                                    {/* Forgot password and sign-up links */}
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
                                        <button type="submit" className="btn btn-primary">
                                            Sign Up
                                        </button>
                                    </form>
                                    <div className="form-group">
                                    <a href="#signin" onClick={() => toggleForm('signIn')}>
                                        Already a member? Sign In.
                                    </a>
                                </div>                                                                        </>
                            )}
                            {isForgetPassword && (
                                <>
                                    <h2>Forget Password</h2>
                                    <form onSubmit={handlePasswordReset}>
                                        {/* Forget password form fields */}
                                        <button type="submit" className="btn btn-primary">
                                            Reset Password
                                        </button>
                                    </form>
                                    <div className="form-group">
                                <a href="#" onClick={() => toggleForm('signIn')}>
                                    Back to Sign In
                                </a>
                            </div>                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;